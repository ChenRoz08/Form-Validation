import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const validationSchema = z
  .object({
    firstName: z.string().max(10).min(2, { message: "שם פרטי נדרש" }),
    lastName: z.string().max(10).min(2, { message: "שם משפחה נדרש" }),
    email: z.string().min(1, { message: "נדרש מייל תקין" }),
    phone: z
      .string()
      .regex(/^05\d([-]{0,1})\d{7}$/, { message: "נדרש טלפון תקין" }),
    password: z
      .string()
      .min(2, "סיסמא צריכה להכיל לפחות 2 תווים")
      .max(8, "מקסימום 8 תווים")
      .refine(
        (value) => /[0-9]/.test(value),
        "סיסמא צריכה להכיל לפחות מספר אחד"
      ),
    confirmPassword: z.string().min(1, { message: "סיסמא לא תואמת" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "סיסמא לא תואמת",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => console.log(data);

  return (
    <form className="px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 md:flex md:justify-between">
        <div className="text-right mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="lastName"
          >
            שם משפחה
          </label>
          <input
            className={` text-right w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.firstName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="lastName"
            type="text"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-right text-xs italic text-red-500 mt-2">
              {errors.lastName?.message}
            </p>
          )}
        </div>
        <div className="text-right md:ml-2">
          <label
            className="text-right block mb-2 text-sm font-bold text-gray-700"
            htmlFor="firstName"
          >
            שם פרטי
          </label>
          <input
            className={`text-right w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.firstName && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="firstName"
            type="text"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.firstName?.message}
            </p>
          )}
        </div>
      </div>
      <div className=" mb-4">
        <label
          className=" text-right block mb-2 text-sm font-bold text-gray-700"
          htmlFor="phone"
        >
          מספר טלפון
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.phone && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="phone"
          type="phone"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-right text-xs italic text-red-500 mt-2">
            {errors.phone?.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="text-right block mb-2 text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          כתובת מייל
        </label>
        <input
          className={`  w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.email && "border-red-500"
          } rounded appearance-none focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-right text-xs italic text-red-500 mt-2">
            {errors.email?.message}
          </p>
        )}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="text-right mb-4 md:mr-2 md:mb-0">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="c_password"
          >
            אישור סיסמא
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="c_password"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
        <div className="relative text-right md:ml-2">
          <label
            className="text-right block mb-2 text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            סיסמא
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
              errors.password && "border-red-500"
            } rounded appearance-none focus:outline-none focus:shadow-outline`}
            id="password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
          />
          <label
            onClick={() => setShowPassword(!showPassword)}
            className="bg-pink-200 hover:bg-pink-300 rounded px-1 py-1 text-xs italic text-gray-600 cursor absolute left-28 top-8"
          >
            {showPassword ? "הסתר סיסמא" : "הראה סיסמא"}
          </label>
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-md hover:bg-purple-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          צור משתמש
        </button>
      </div>
    </form>
  );
};
export default Form;
