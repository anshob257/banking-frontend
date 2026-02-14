import Swal from "sweetalert2";

export const showSuccess = async (message) => {
  await Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    confirmButtonColor: "#7c3aed",
    background: "#0f172a",
    color: "#ffffff"
  });
};

export const showError = async (message) => {
  await Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
    confirmButtonColor: "#ef4444",
    background: "#0f172a",
    color: "#ffffff"
  });
};

export const showLoading = (message = "Processing...") => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    background: "#0f172a",
    color: "#ffffff",
    didOpen: () => {
      Swal.showLoading();
    }
  });
};
