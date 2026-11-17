import React from 'react';
import Breadcrumbs from '../components/common/Breadcrumbs';

const TermsConditionsPage = () => {
  return (
    <div className="pt-28 pb-20">
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} />
          <h1 className="text-4xl font-extrabold font-heading text-primary mb-4">Terms and Conditions</h1>
          <p className="text-slate-500 text-sm">Last Updated: January 15, 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using this website, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            All website materials, logos, branding, copy, illustrations, and software components created by BrandVerse are the intellectual property of BrandVerse unless otherwise agreed upon in writing under specific enterprise client Master Services Agreements (MSAs).
          </p>

          <h2>3. Professional Service Engagements</h2>
          <p>
            Detailed technical delivery terms, statement of work (SOW) deliverables, acceptance criteria, intellectual property ownership transfers, and payment schedules are governed by dedicated commercial agreements executed between BrandVerse and each client.
          </p>

          <h2>4. Limitation of Liability</h2>
          <p>
            In no event shall BrandVerse or its suppliers be liable for any damages arising out of the use or inability to use the informational materials on BrandVerse's website, even if notified orally or in writing of the possibility of such damage.
          </p>

          <h2>5. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of California, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditionsPage;
