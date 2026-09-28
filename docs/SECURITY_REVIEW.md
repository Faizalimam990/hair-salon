# Security and privacy review

This is a static brochure and enquiry site. There is no database, authentication, payment handler, file upload, or server-side form endpoint. Booking details live only in component state; no storage or analytics code collects them. A visitor explicitly follows the generated WhatsApp URL and sends the message in WhatsApp. React escapes displayed text, and the complete message is encoded as one URL parameter.

Only public business details and an owner-supplied contact number are embedded. All external tabs use `noopener noreferrer`. Google Maps opens through an external link. Self-hosted photos, fonts and JavaScript avoid third-party requests during the initial page view. No package audit vulnerabilities were reported. Public hosting headers include a restrictive content policy, disabled unused permissions, anti-framing and MIME-sniffing protection; equivalent enforcement depends on the selected static host.

The test suite exercises date validation and punctuation-safe URL encoding. No intrusive tests, messages or production changes occurred. Dedicated secret scanners were unavailable; source was manually inspected and contains no credentials. Dependency updates and a post-deployment header check remain the maintainer's responsibility.
