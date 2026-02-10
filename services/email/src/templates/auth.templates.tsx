import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Hr,
  Tailwind,
  Img,
} from '@react-email/components';

interface EmailVerificationProps {
  url: string;
  name: string;
}

export function EmailVerification(props: EmailVerificationProps) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>Verify your DSPLN email address</Preview>
        <Body className="bg-[#f5f5f5] font-sans">
          <Container className="mx-auto max-w-[580px] px-6 pt-10 pb-12">
            <Section className="text-center">
              <Img
                src="https://dspln.com/cdn/shop/files/DSPLN_c32d710e-d1f9-476f-81ec-94edba68738c_200x@2x.png"
                alt="DSPLN"
                width={140}
                style={{ margin: '0 auto', display: 'block' }}
              />
            </Section>

            <Section className="rounded-2xl border border-[#e6e6e6] bg-white px-12 py-10 shadow">
              <Text className="mb-4 text-center text-2xl font-bold text-[#1c1b1b]">
                Email Verification
              </Text>

              <Text className="mb-6 text-base leading-relaxed text-[#1c1b1b]">
                Hi {props.name},
              </Text>

              <Text className="mb-6 text-base leading-relaxed text-[#1c1b1b]">
                Welcome to DSPLN! To complete your account setup and start
                designing custom apparel, please verify your email address by
                clicking the button below.
              </Text>

              <Section className="my-8 text-center">
                <a
                  href={props.url}
                  className="inline-block rounded-lg bg-[#5c0000] px-8 py-4 text-lg font-semibold text-white no-underline hover:bg-[#450000]"
                >
                  Verify Email Address
                </a>
              </Section>

              <Text className="mb-2 text-sm leading-relaxed text-[#63513f]">
                This link will expire in 1 hour.
              </Text>

              <Text className="mb-6 text-sm leading-relaxed text-[#63513f]">
                If the button above doesn't work, you can copy and paste the
                following link into your browser:
              </Text>

              <div className="mb-6 rounded-xl border-2 border-[#e6e6e6] bg-[#f5f5f5] p-4">
                <Text className="m-0 font-mono text-sm break-all text-[#1c1b1b]">
                  {props.url}
                </Text>
              </div>

              <Hr className="my-8 border-[#e6e6e6]" />

              <Text className="mb-6 text-sm leading-relaxed text-[#63513f]">
                If you didn't create an account with DSPLN, please ignore this
                email.
              </Text>
            </Section>

            <Section className="px-12">
              <Text className="mt-8 text-center text-xs leading-relaxed text-[#b1b1b1]">
                This message was produced and distributed by DSPLN.
                <br />© {new Date().getFullYear()} DSPLN. All rights reserved.
              </Text>

              <Text className="mt-4 text-center text-xs text-[#b1b1b1]">
                If you have any questions, contact our support team.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

interface ResetPasswordProps {
  url: string;
  name: string;
}

export function ResetPassword(props: ResetPasswordProps) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head />
        <Preview>Reset your DSPLN password</Preview>
        <Body className="bg-[#f5f5f5] font-sans">
          <Container className="mx-auto max-w-[580px] px-6 pt-10 pb-12">
            <Section className="text-center">
              <Img
                src="https://dspln.com/cdn/shop/files/DSPLN_c32d710e-d1f9-476f-81ec-94edba68738c_200x@2x.png"
                alt="DSPLN"
                width={140}
                style={{ margin: '0 auto', display: 'block' }}
              />
            </Section>

            <Section className="rounded-2xl border border-[#e6e6e6] bg-white px-12 py-10 shadow">
              <Text className="mb-4 text-center text-2xl font-bold text-[#1c1b1b]">
                Password Reset
              </Text>

              <Text className="mb-6 text-base leading-relaxed text-[#1c1b1b]">
                Hi {props.name},
              </Text>

              <Text className="mb-6 text-base leading-relaxed text-[#1c1b1b]">
                We received a request to reset your DSPLN account password. If
                you made this request, please click the button below to set a
                new password.
              </Text>

              <Section className="my-8 text-center">
                <a
                  href={props.url}
                  className="inline-block rounded-lg bg-[#5c0000] px-8 py-4 text-lg font-semibold text-white no-underline hover:bg-[#450000]"
                >
                  Reset Password
                </a>
              </Section>

              <Text className="mb-6 text-sm leading-relaxed text-[#63513f]">
                If the button above doesn't work, you can copy and paste the
                following link into your browser:
              </Text>

              <div className="mb-6 rounded-xl border-2 border-[#e6e6e6] bg-[#f5f5f5] p-4">
                <Text className="m-0 font-mono text-sm break-all text-[#1c1b1b]">
                  {props.url}
                </Text>
              </div>

              <Text className="mb-6 text-sm leading-relaxed text-[#63513f]">
                This link will expire in 1 hour for security reasons.
              </Text>

              <Hr className="my-8 border-[#e6e6e6]" />

              <Text className="mb-6 text-sm leading-relaxed text-[#63513f]">
                If you didn't request a password reset, please ignore this
                email. Your password will remain unchanged.
              </Text>
            </Section>

            <Section className="px-12">
              <Text className="mt-8 text-center text-xs leading-relaxed text-[#b1b1b1]">
                This message was produced and distributed by DSPLN.
                <br />© {new Date().getFullYear()} DSPLN. All rights reserved.
              </Text>

              <Text className="mt-4 text-center text-xs text-[#b1b1b1]">
                If you have any questions, contact our support team.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
