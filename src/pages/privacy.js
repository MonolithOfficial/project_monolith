import React from "react"
import SEO from "../components/seo"
import "../styles/privacy.scss"

const PrivacyPage = () => (
  <div className="privacyPage">
    <SEO title="Privacy Policy — Monotune" />
    <div className="container">

      <header className="pageHeader">
        <h1>Privacy Policy</h1>
        <p>Monotune &nbsp;·&nbsp; Last updated: March 25, 2026</p>
      </header>

      <div className="highlightBox">
        <p><strong>Short version:</strong> Monotune uses your microphone only to detect pitch. No audio is ever recorded, stored, or transmitted. The app collects no personal data of any kind.</p>
      </div>

      <h2>1. Overview</h2>
      <p>Monotune is a guitar tuner application developed by Project Monolith. This policy explains how the app handles your data — specifically, that it does not collect, store, or share any.</p>

      <h2>2. Microphone Access</h2>
      <p>Monotune requests access to your device's microphone for one purpose: real-time pitch detection.</p>
      <ul>
        <li>Audio captured by the microphone is processed entirely on your device.</li>
        <li>Audio is analysed in small windows (approximately 46 milliseconds) to calculate the pitch of a played note.</li>
        <li>No audio is recorded, saved to storage, or transmitted anywhere.</li>
        <li>Microphone access is only active while you have pressed <em>Start Tuner</em>. It stops immediately when you press <em>Stop</em> or leave the app.</li>
      </ul>

      <h2>3. Data Collection</h2>
      <p>Monotune does not collect any personal information. The following applies:</p>
      <ul>
        <li>No account or registration is required.</li>
        <li>No analytics, crash reporting, or telemetry libraries are included.</li>
        <li>No data is sent to any server.</li>
        <li>No data is shared with third parties.</li>
        <li>No advertising SDKs are used.</li>
      </ul>

      <h2>4. Device Permissions</h2>
      <p>The only permission Monotune requests is <code>RECORD_AUDIO</code>. It is used solely for pitch detection as described above. You can revoke this permission at any time in your device's app settings, though doing so will prevent the tuner from functioning.</p>

      <h2>5. Children's Privacy</h2>
      <p>Monotune does not knowingly collect data from anyone, including children under the age of 13. Because the app collects no data at all, it presents no special risk to younger users.</p>

      <h2>6. Changes to This Policy</h2>
      <p>If this policy changes materially, the updated version will be published at the same URL with a revised date at the top. Continued use of the app after changes constitutes acceptance of the updated policy.</p>

      <h2>7. Contact</h2>
      <p>Questions about this policy can be directed to: <a href="mailto:business.projectmonolith@gmail.com">business.projectmonolith@gmail.com</a></p>

      <footer className="pageFooter">
        &copy; 2026 Project Monolith. Monotune is provided as-is with no warranty.
      </footer>

    </div>
  </div>
)

export default PrivacyPage
