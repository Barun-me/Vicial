"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import Link from "next/link";


export default function Page() {
  return (
    <div className='flex items-center justify-between h-screen p-8'>
      <div className='flex flex-col items-center justify-center w-1/2 gap-4'>
        <b className='lg:text-9xl sm:text-7xl text-red-600 font-bold'>Vi
          <i className='font-bold lg:text-6xl sm:text-4xl text-black'>cial</i>
        </b>
        <div className="text-2xl sm:text-md text-center">A Dedicated Violence updates App</div>
      </div>
      
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center gap-4'>
        <h1 className='mb-10 text-2xl xsm:text-3xl md:text-5xl font-bold'>Join Today Now</h1>
        <SignUp.Root>
          <SignUp.Step name="start" className="flex flex-col gap-4">
            <Clerk.Connection
              name="google"
              className="cursor-pointer bg-black rounded-full p-2 text-white w-72 flex items-center justify-center gap-2 font-bold"
            >
              <svg viewBox="0 0 24 24" width={24} height={24}>
                <path
                  d="M18.977 4.322L16 7.3c-1.023-.838-2.326-1.35-3.768-1.35-2.69 0-4.95 1.73-5.74 4.152l-3.44-2.635c1.656-3.387 5.134-5.705 9.18-5.705 2.605 0 4.93.977 6.745 2.56z"
                  fill="#EA4335"
                ></path>
                <path
                  d="M6.186 12c0 .66.102 1.293.307 1.89L3.05 16.533C2.38 15.17 2 13.63 2 12s.38-3.173 1.05-4.533l3.443 2.635c-.204.595-.307 1.238-.307 1.898z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M18.893 19.688c-1.786 1.667-4.168 2.55-6.66 2.55-4.048 0-7.526-2.317-9.18-5.705l3.44-2.635c.79 2.42 3.05 4.152 5.74 4.152 1.32 0 2.474-.308 3.395-.895l3.265 2.533z"
                  fill="#34A853"
                ></path>
                <path
                  d="M22 12c0 3.34-1.22 5.948-3.107 7.688l-3.265-2.53c1.07-.67 1.814-1.713 2.093-3.063h-5.488V10.14h9.535c.14.603.233 1.255.233 1.86z"
                  fill="#4285F4"
                ></path>
              </svg>
              Sign up with Google
            </Clerk.Connection>
            <div className="flex flex-col gap-4">
              <div className="text-center text-lg">Sign up with Credentials</div>
              <Clerk.Field name="username" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-md"
                  placeholder="Username"
                />
                <Clerk.FieldError className="text-red-400 text-md" />
              </Clerk.Field>
              <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-md"
                  placeholder="E-mail"
                />
                <Clerk.FieldError className="text-red-400 text-md" />
              </Clerk.Field>
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-md"
                  placeholder="Password"
                />
                <Clerk.FieldError className="text-red-300 text-md" />
              </Clerk.Field>
              <SignUp.Captcha />
              <SignUp.Action
                submit
                className="cursor-pointer bg-blue-900 rounded-full p-2 text-white font-bold w-72 text-center "
              >
                Sign up
              </SignUp.Action>
            </div>
          </SignUp.Step>
          <SignUp.Step name="continue" className="flex flex-col gap-4">
            <Clerk.Field name="username">
              <Clerk.Input placeholder="username" className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm" />
              <Clerk.FieldError className="text-red-400 text-sm" />
            </Clerk.Field>

            <SignUp.Action submit className="w-72 text-center text-blue-900 underline">Continue</SignUp.Action>
          </SignUp.Step>
          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <h1 className="text-sm mb-2">Check your e-mail</h1>
              <Clerk.Field name="code" className="flex flex-col gap-4">
                <Clerk.Input
                  placeholder="Verification code"
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-md"
                />
                <Clerk.FieldError className="text-red-400 text-sm" />
              </Clerk.Field>
              <SignUp.Action
                submit
                className="mt-2 underline text-blue-900 text-sm"
              >
                Verify
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
          {/* OR SIGN UP */}
          <div className="w-72 flex items-center gap-4">
            <div className="h-px bg-gray-700 flex-grow"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-700 flex-grow"></div>
          </div>
          <Link
            href="/sign-in"
            className="bg-gray-700 rounded-full p-2 text-white font-bold w-72 text-center"
          >
            Already have an account?
          </Link>
          <p className="w-72 text-xs">
            By signing up, you agree to the{" "}
            <span className="cursor-pointer text-blue-700">Terms of Service</span> and{" "}
            <span className="cursor-pointer text-blue-700">Privacy Policy</span>, including{" "}
            <span className="cursor-pointer text-blue-700">Cookie Use</span>.
          </p>
        </SignUp.Root>
      </div>
    </div>
  )
}