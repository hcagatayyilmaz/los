import React from "react"
import {MuseoModerno} from "next/font/google"
import Header from "../components/Header"

const museoModerno = MuseoModerno({
  subsets: ["latin"]
})

function Page() {
  return (
    <>
      {" "}
      <Header />
      <div
        className={`h-screen w-screen p-4 flex flex-col items-center ${museoModerno.className}`}
      >
        <h1 className={`text-2xl font-bold mb-4 ${museoModerno.className}`}>
          Terms of Use for Los
        </h1>
        <div className='terms-of-use text-left max-w-3xl'>
          <p>
            <strong>Last Updated: [Current Date]</strong>
          </p>
          <h2 className='text-xl font-bold mt-6'>1. Introduction</h2>
          <p>
            Welcome to Los (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;).
            These Terms of Use govern your access to and use of the Los
            application and website (collectively, the &quot;Service&quot;). By
            using the Service, you agree to be bound by these Terms. If you
            disagree with any part of the terms, then you may not access the
            Service.
          </p>

          <h2 className='text-xl font-bold mt-6'>2. Who We Are</h2>
          <p>
            Los is operated by Jimmy Pop, located in Tübingen, Germany. For any
            questions regarding these Terms, please contact us at
            support@los.city.
          </p>

          <h2 className='text-xl font-bold mt-6'>3. Services Offered</h2>
          <p>
            Los provides gamified city exploration services, including listing
            city experiences, rewards programs, and ticketing services.
          </p>

          <h2 className='text-xl font-bold mt-6'>4. Eligibility</h2>
          <p>
            You must be at least 13 years old to use the Service. By using the
            Service, you represent and warrant that you meet this eligibility
            requirement.
          </p>

          <h2 className='text-xl font-bold mt-6'>5. Account Creation</h2>
          <p>
            To access certain features of the Service, you may need to create an
            account. You can do this using email authentication or through
            third-party services such as Google or Facebook. You are responsible
            for maintaining the confidentiality of your account and password.
          </p>

          <h2 className='text-xl font-bold mt-6'>6. Personal Data</h2>
          <p>
            We collect and process personal data in accordance with our Privacy
            Policy and applicable data protection laws, including the General
            Data Protection Regulation (GDPR). By using the Service, you consent
            to such processing and you warrant that all data provided by you is
            accurate.
          </p>

          <h2 className='text-xl font-bold mt-6'>7. User-Generated Content</h2>
          <p>
            Users may have the ability to check in to locations and add content.
            Los reserves the right to review, remove, or edit any user-generated
            content. By submitting content to the Service, you grant Los a
            worldwide, non-exclusive, royalty-free license to use, reproduce,
            modify, and distribute the content in connection with the Service.
          </p>

          <h2 className='text-xl font-bold mt-6'>8. Code of Conduct</h2>
          <p>
            Users are expected to use the Service in a manner consistent with
            all applicable laws and regulations. Prohibited activities include
            but are not limited to:
          </p>
          <ul className='list-disc list-inside ml-6'>
            <li>Violating any laws or regulations</li>
            <li>Infringing on the rights of others</li>
            <li>Posting false or misleading information</li>
            <li>Attempting to gain unauthorized access to the Service</li>
          </ul>

          <h2 className='text-xl font-bold mt-6'>9. Termination of Accounts</h2>
          <p>
            You may terminate your account at any time by contacting
            support@los.city. We reserve the right to terminate or suspend
            access to our Service immediately, without prior notice or
            liability, for any reason whatsoever, including without limitation
            if you breach the Terms.
          </p>

          <h2 className='text-xl font-bold mt-6'>10. Changes to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time.
            If a revision is material, we will try to provide at least 30
            days&apos; notice prior to any new terms taking effect.
          </p>

          <h2 className='text-xl font-bold mt-6'>11. Third-Party Services</h2>
          <p>
            Our Service incorporates services from third parties, including
            Google Maps and Kinde Auth. Use of these services is subject to
            their respective terms and conditions.
          </p>

          <h2 className='text-xl font-bold mt-6'>12. Intellectual Property</h2>
          <p>
            Los retains all right, title, and interest in and to the Service,
            including all content, features, and functionality. Users retain
            ownership of their content but grant Los the right to use, modify,
            and distribute such content in connection with the Service.
          </p>

          <h2 className='text-xl font-bold mt-6'>
            13. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by applicable law, in no event shall
            Los be liable for any indirect, punitive, incidental, special,
            consequential or exemplary damages, including without limitation
            damages for loss of profits, goodwill, use, data or other intangible
            losses, arising out of or relating to the use of, or inability to
            use, the Service.
          </p>

          <h2 className='text-xl font-bold mt-6'>14. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of Baden-Württemberg, Germany, without regard to its conflict
            of law provisions. Any disputes arising under or in connection with
            these Terms shall be subject to the exclusive jurisdiction of the
            courts in Tübingen, Germany.
          </p>

          <h2 className='text-xl font-bold mt-6'>15. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at
            support@los.city.
          </p>

          <p>
            By using Los, you acknowledge that you have read and understood
            these Terms of Use and agree to be bound by them.
          </p>
        </div>
      </div>
    </>
  )
}

export default Page
