import Button from "../components/Button"

const RegisterPage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div
            className="absolute shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl shadow-xl shadow-[#00D9EC]">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 shadow-xl shadow-[#374f2f]">
            <div className="max-w-md mx-auto ">
              <div>
                <h1 className="text-2xl font-semibold">Register</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form
                  className="space-y-4 md:space-y-6"
                // onSubmit={onSubmitHandler}
                >
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input autoComplete="off" id="email" name="email" type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Email address"
                      // value={loginInput.email}
                      // onChange={onChangeHandler}
                      />
                      <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                    </div>
                    <div className="relative">
                      <input autoComplete="off" id="password" name="password" type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                        placeholder="Password"
                      // value={loginInput.password}
                      // onChange={onChangeHandler}
                      />
                      <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                    </div>
                    <div className="relative">
                      <Button type="submit" />
                    </div>
                  </div>
                </form>
                <div>
                  <h1>Login with Google Account</h1>
                  {/* <GoogleLogin onSuccess={googleLogin} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterPage