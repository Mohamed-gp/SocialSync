import { useEffect, useState } from "react";
import RegisterInput from "../../components/auth/RegisterInput";
import { FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import GoogleSignInButton from "../../components/auth/GoogleSignInButton";
import customAxios from "../../axios/customAxios";
import toast from "react-hot-toast";
import { authActions } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: "",
    location: "",
    occupation: "",
    email: "",
    password: "",
    image: null,
    loading: false,
  });

  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const RegisterHandler = async () => {
    setData({ ...data, loading: true });
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("occupation", data.occupation);
    formData.append("location", data.location);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.image) {
      formData.append("image", data.image);
    }
    try {
      const { data } = await customAxios.post("/auth/register", formData);
      dispatch(authActions.login(data.data));
      toast.success(data.message);
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setData({ ...data, loading: false });
    }
  };
  return (
    <div className="container rounded-2xl bg-white flex flex-col my-6 py-6 px-6 gap-3">
      <p className="text-mainColor font-bold text-center text-2xl">REGISTER</p>
      <p className="text-center">
        Welcome to SocialSync,The social Media for SocioPaths!
      </p>
      <RegisterInput
        data={data}
        name={"username"}
        setData={setData}
        isHalf={true}
      />
      <RegisterInput data={data} name={"location"} setData={setData} />
      <RegisterInput data={data} name={"occupation"} setData={setData} />
      <RegisterInput data={data} name={"email"} setData={setData} />
      <RegisterInput data={data} name={"password"} setData={setData} />
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input
                {...getInputProps()}
                multiple={false}
                onChange={(e) => {
                  if (e.target.files) {
                    setData({ ...data, image: e.target.files[0] as any });
                  }
                }}
              />
              <p className="text-center cursor-pointer w-full my-4 border-mainColor border-2 py-4 rounded-xl border-dashed">
                Drag 'n' drop your profile Image here, or click to select image
              </p>
            </div>
          </section>
        )}
      </Dropzone>
      {data.image && (
        <div className="w-16 h-16 rounded-full mx-auto relative">
          <img
            className="w-16 h-16 rounded-full mx-auto"
            src={URL.createObjectURL(data.image)}
            alt=""
          />
          <FaX
            onClick={() => setData({ ...data, image: null })}
            className="absolute top-0 -right-1 cursor-pointer bg-red-400 text-white p-1 text-xl rounded-full"
          />
        </div>
      )}
      <GoogleSignInButton />
      <button
        onClick={() => RegisterHandler()}
        className="bg-mainColor text-white font-bold py-2 rounded-xl my-2"
      >
        {data.loading ? "LOADING..." : "SUBMIT"}
      </button>
      <p className="text-center">
        Already Have An Account?{" "}
        <Link to="/login" className="text-mainColor font-bold">
          Login
        </Link>
      </p>
    </div>
  );
};
export default Register;
