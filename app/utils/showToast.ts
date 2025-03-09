import { toast, Bounce } from "react-toastify";

const showToast = (type: "success" | "error" | "info", message: string) => {
  toast[type](message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
};

export default showToast;
