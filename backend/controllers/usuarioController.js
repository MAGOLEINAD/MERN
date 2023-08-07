import { emailOlvidePassword, emailRegistro } from "../helpers/emails.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJwt.js";
import Usuario from "../models/usuario.js";


//el modelo que me genera mongoose tiene metodos incorporados como .save que lo guarda en base de datos.

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();
    // Envia un mail para que confirme el Usuario
    emailRegistro({
      email:usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })
    res.json({msg:"Usuario creado correctamente, revisa tu Email para confirmar tu cuenta"});
  } catch (error) {}
};

const confirmar = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  // Comprobar si el usuario existe
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no Existe");
    return res.status(404).json({ msg: error.message });
  }
  console.log(usuario);
  //Comprobar si el usuario esta confirmado
  if (!usuario.confirmado) {
    const error = new Error("Tu cuenta no ha sido confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(404).json({ msg: error.message });
  }
};



const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no Existe");
    return res.status(404).json({ msg: error.message });
  }
  try {
    usuario.token = generarId();
    await usuario.save();

     //Enviar Email
    emailOlvidePassword({
      email:usuario.email,
      nombre: usuario.nombre,
      token: usuario.token
    })
    res.json({ msg: "Hemos enviado un mail con las instrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token valido y el usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};
const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";
    try {
      await usuario.save();
      res.json({ msg: "El password se cambio correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("El token no es valido");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
    const {usuario} = req
    res.json(usuario)
}

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil
};
