class StringUtil {
  static captureStringOnEmail(email) {
    let emailParts = email.split("@");
    return emailParts[0];
  }

  static captureNeedAsesor(command) {
    let parts = command.split(" ");
    if (Number(parts.length) === 2 && parts[0] === "/asesor") {
      return {
        needAsesor: true,
        asesorID: parts[1],
      };
    } else {
      return {
        needAsesor: false,
        asesorID: null,
      };
    }
  }
}

export default StringUtil;
