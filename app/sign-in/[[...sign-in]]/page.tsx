'use client'

import * as Clerk from '@clerk/elements/common'
import * as SignIn from '@clerk/elements/sign-in'
import Link from 'next/link'


export default function Page() {
  return (
    <div className='flex items-center justify-between h-screen p-8'>
      <div className='flex flex-col items-center justify-center w-1/2 text-2xl'>
        <b className='lg:text-9xl sm:text-7xl text-red-600 font-bold'>Vi
          <i className='font-bold lg:text-6xl sm:text-4xl text-black'>cial</i>
        </b>
        <br />
        <div className='text-2xl sm:text-md text-center'>A Dedicated Violence updates App</div>
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center gap-4'>
        <h1 className='mb-10 text-2xl xsm:text-3xl md:text-5xl font-bold'>Let's Sign In</h1>
        <SignIn.Root>
          <Clerk.Connection name='google' className='cursor-pointer bg-black rounded-full p-2 text-white
          w-72 flex items-center justify-center gap-2'>
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
            Sign in with Google
          </Clerk.Connection>
          {/* LOGIN WITH CREDENTIALS */}
          <SignIn.Step name="start">
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Input
                placeholder="john@gmail.com"
                className="py-2 px-6 rounded-full bg-black text-white w-72 placeholder:text-sm"
              />
              <Clerk.FieldError className="text-red-400 text-sm" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="cursor-pointer font-bold mt-2 text-sm underline w-72 text-center text-blue-800"
            >
              Continue
            </SignIn.Action>
          </SignIn.Step>
          <SignIn.Step name="verifications">
            <SignIn.Strategy name="password">
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="password"
                  className="py-2 px-6 rounded-full bg-black text-white w-72 placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-400 text-sm" />
              </Clerk.Field>
              <div className="flex flex-col gap-2">
                <SignIn.Action
                  submit
                  className="mt-2 text-sm underline w-72 text-center text-blue-800"
                >
                  Continue
                </SignIn.Action>
                <SignIn.Action
                  navigate="forgot-password"
                  className="mt-2 text-sm underline w-72 text-center "
                >
                  Forgot Password?
                </SignIn.Action>
              </div>
            </SignIn.Strategy>
            <SignIn.Strategy name="reset_password_email_code">
              <p className="text-sm mb-2">
                We sent a code to <SignIn.SafeIdentifier />.
              </p>

              <Clerk.Field name="code" className="flex flex-col gap-2">
                <Clerk.Input
                  className="py-2 px-6 rounded-full text-black w-72 placeholder:text-sm"
                  placeholder="Verification Code"
                />
                <Clerk.FieldError className="text-red-400 text-sm" />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="mt-2 text-sm underline w-72 text-center text-blue-800"
              >
                Continue
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>
          <SignIn.Step
            name="forgot-password"
            className="flex justify-between w-72 text-sm"
          >
            <SignIn.SupportedStrategy name="reset_password_email_code">
              <span className="underline text-blue-800">Reset password</span>
            </SignIn.SupportedStrategy>

            <SignIn.Action navigate="previous" className="underline">
              Go back
            </SignIn.Action>
          </SignIn.Step>
          <SignIn.Step name="reset-password">
            <h1>Reset your password</h1>

            <Clerk.Field name="password">
              <Clerk.Label>New password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="confirmPassword">
              <Clerk.Label>Confirm password</Clerk.Label>
              <Clerk.Input />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit>Reset password</SignIn.Action>
          </SignIn.Step>
          {/* OR SIGN UP */}
          <div className="w-72 flex items-center gap-4">
            <div className="h-px bg-gray-700 flex-grow"></div>
            <span className="text-gray-500">or</span>
            <div className="h-px bg-gray-700 flex-grow"></div>
          </div>
          <Link
            href="/sign-up"
            className="bg-gray-700 rounded-full p-2 text-white font-bold w-72 text-center"
          >
            Create Account
          </Link>
          <p className="w-72 text-md">
            By signing up, you agree to the <span className="text-blue-800">Terms of Service</span> and <span className="text-iconBlue">Privacy Policy</span>,
            including <span className="text-blue-800">Cookie Use</span>.
          </p>
        </SignIn.Root>
      </div>
    </div>
  )
}