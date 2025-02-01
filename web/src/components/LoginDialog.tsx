import { useAuth } from "../context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginRequest } from "../api/types";
import { useAppContext } from "../context/AppContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormData = z.infer<typeof loginSchema>;

const LoginDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showLoading, hideLoading, showToast } = useAppContext();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      showLoading();
      await login(data);
      showToast("Logged In", "success");
      hideLoading();
      onClose();
    } catch (error) {
      console.error("Login failed:", error);
      showToast("Login Failed", "error");
      hideLoading();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Login</h3>
        <div className="divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              placeholder="Email"
              className="input w-full"
              {...register("email")}
            />
            {errors.email && (
              <p className="fieldset-label text-error text-sm">
                {errors.email.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              placeholder="Password"
              className="input w-full"
              {...register("password")}
            />
            {errors.password && (
              <p className="fieldset-label text-error text-sm">
                {errors.password.message}
              </p>
            )}
          </fieldset>
          <div className="modal-action">
            <button type="button" className="btn btn-soft" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-soft btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog;
