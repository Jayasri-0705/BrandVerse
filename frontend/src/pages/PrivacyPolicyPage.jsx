import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-28 pb-20">
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />
          <h1 className="text-4xl font-extrabold font-heading text-primary mb-4">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last Updated: January 15, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <h2>1. Introduction</h2>
          <p>
            BRANDVERSE ("BrandVerse," "we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy describes how we collect, use, and disclose information through our website and services.
          </p>

          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when filling out our contact forms, applying for job opportunities, subscribing to updates, or communicating with us. This information may include your name, email address, phone number, company name, resume documents, and message contents.
          </p>

          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and prepare customized service proposals.</li>
            <li>To process and evaluate employment applications submitted via our Careers portal.</li>
            <li>To improve our digital platforms, user experience, and technical infrastructure.</li>
            <li>To comply with applicable legal obligations and enforce our agreements.</li>
          </ul>

          <h2>4. Data Storage and Security</h2>
          <p>
            We implement industry-standard technical and organizational security measures, including database encryption, secure sockets layer (SSL/TLS) encryption, and restricted staff access controls to protect personal data from unauthorized access, alteration, or disclosure.
          </p>

          <h2>5. Your Rights</h2>
          <p>
            Under GDPR, CCPA, and applicable data privacy regulations, you have the right to request access to, correction of, or deletion of your personal information held by BrandVerse. You may exercise these rights at any time by contacting us at <a href="mailto:privacy@brandverse.tech">privacy@brandverse.tech</a>.
          </p>

          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The latest version will always be posted on this page with an updated revision date.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
