import Asesor from "../models/Asesor";

class AsesorServiceImpl {
  static getAll() {
    return Asesor.findAll();
  }

  static existeAsesor(cip) {
    return Asesor.findOne({
      where: {
        cip: cip,
      },
    });
  }

  static getAsesor(cip) {
    return Asesor.findOne({
      where: {
        cip: cip,
      },
    });
  }
}

export default AsesorServiceImpl;
