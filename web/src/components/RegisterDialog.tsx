import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useAppContext } from "../context/AppContext";

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirmation: z
      .string()
      .min(6, "Password confirmation must be at least 6 characters"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

type FormData = z.infer<typeof registerSchema>;

const RegisterDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { showLoading, hideLoading, showToast } = useAppContext();

  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      showLoading();
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.passwordConfirmation,
      });
      showToast("Registered", "success");
      hideLoading();
      onClose();
    } catch (error) {
      console.error("Registration failed:", error);
      showToast("Register Failed", "error");
      hideLoading();
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h3 className="font-bold text-2xl">Register</h3>
        <div className="divider"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Name</legend>
            <input
              type="text"
              placeholder="Name"
              className="input w-full"
              {...register("name")}
            />
            {errors.name && (
              <p className="fieldset-label text-error text-sm">
                {errors.name.message}
              </p>
            )}
          </fieldset>
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
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Confirm Password</legend>
            <input
              type="password"
              placeholder="Confirm Password"
              className="input w-full"
              {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation && (
              <p className="fieldset-label text-error text-sm">
                {errors.passwordConfirmation.message}
              </p>
            )}
          </fieldset>
          <div className="modal-action">
            <button type="button" className="btn btn-soft" onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-soft btn-secondary">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterDialog;
