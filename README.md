# Verdant Business Services
## Company Registration, Business Incorporation & Corporate Compliance Platform
### Premium Corporate Consulting Website | Blue & White Visual Identity | Advanced UI/UX & 3D Interactive System

---

## 01. Platform Overview
**Verdant Business Services** is an enterprise-grade corporate consulting, business registration, legal documentation, and regulatory compliance platform. The website is engineered to transition visitors through a seamless customer journey:
**Discover Services → Understand Solutions → Explore Packages → Compare Pricing → Submit Enquiry → Register Account → Upload Documents → Track Application → Manage Compliance.**

- **Theme Palette:** Corporate Blue & Pure White with rich navy undertones, ice-blue accents, and full Light & Dark mode support.
- **RTL Support:** Full Right-to-Left (RTL) mode using `document.documentElement.dir`, CSS logical properties, and layout reversals.
- **Strict Even-Number Card Rule:** Every single card-based section contains an even number of cards (4, 6, or 8) across all viewports.
- **Image Integration:** All **99 unique photorealistic corporate images** (`image-1.png` to `image-99.png`) are utilized with contextual content matching each image without duplication.

---

## 02. Complete Route Structure

| # | Page Name | Route | Navigation / Layout | Image Allocation |
|---|-----------|-------|---------------------|------------------|
| 1 | **Home 1 (Company Registration)** | [index.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/index.html) | Sticky Global Navbar + Forest/Navy Footer | 20 Images (1, 45, 65, 11, 87, 14, 8, 22, 18, 48, 10, 53, 68, 50, 47, 3, 16, 26, 63, 12) |
| 2 | **Home 2 (Compliance & Growth)** | [home-2.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/home-2.html) | Completely Distinct Layout + Compliance Focus | 22 Images (6, 2, 52, 55, 70, 88, 36, 78, 60, 17, 82, 66, 7, 49, 20, 86, 51, 31, 80, 91, 77, 98) |
| 3 | **About Us** | [about.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/about.html) | Story, Mission, Expertise, Principles | 12 Images (15, 79, 13, 29, 94, 59, 72, 4, 21, 97, 40, 93) |
| 4 | **Services Catalogue** | [services.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/services.html) | Full Corporate Services Catalogue & Modals | 16 Images (34, 69, 27, 84, 5, 25, 62, 61, 71, 46, 54, 81, 96, 57, 75, 35) |
| 5 | **Products & Bundles** | [products.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/products.html) | Startup & Retainer Package Solutions | 10 Images (44, 24, 58, 85, 67, 83, 56, 28, 89, 39) |
| 6 | **Transparent Pricing** | [pricing.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/pricing.html) | Registration & Retainer Tiers + Comparison | 6 Images (23, 64, 92, 38, 90, 95) |
| 7 | **Knowledge & Insights** | [resources.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/resources.html) | Educational Articles & Regulatory Guides | 7 Images (73, 30, 74, 9, 19, 41, 43) |
| 8 | **FAQ Knowledgebase** | [faq.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/faq.html) | Categorized Questions & Advisory Panels | 3 Images (33, 37, 42) |
| 9 | **Contact & Advisory** | [contact.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/contact.html) | Enquiry Form, Hotline, Office Locations | 3 Images (99, 76, 32) |
| 10 | **Client Login** | [login.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/login.html) | **NO Navbar, NO Footer, NO Images** | Standalone auth card + Top-Right Theme/RTL |
| 11 | **Client Registration** | [register.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/register.html) | **NO Navbar, NO Footer, NO Images** | Password strength indicator, client storage |
| 12 | **Forgot Password** | [forgot-password.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/forgot-password.html) | **NO Navbar, NO Footer, NO Images** | Simulated recovery instructions |
| 13 | **Client Dashboard** | [dashboard.html](file:///d:/November%20websites/Company%20Registration%20%26%20Compliance%20Service/dashboard.html) | **NO Public Nav, NO Public Footer** | Independent portal with 10 internal tabs |

**Total Unique Images Utilized:** Exactly **99 out of 99 images** (Zero duplicates, zero omissions).

---

## 03. Design System & CSS Variables

The website is styled using a modern **Corporate Blue** color system:
```css
:root {
  --color-primary: #1D4ED8;         /* Royal Executive Blue */
  --color-primary-dark: #1E3A8A;    /* Deep Navy */
  --color-primary-light: #3B82F6;   /* Sapphire Accent */
  --color-navy-deep: #0A192F;       /* Midnight Executive Navy */
  --color-ice-blue: #EFF6FF;        /* Light Ice Blue Background */
  --color-accent-cyan: #0284C7;     /* High-Trust Cyan */
  --bg-body: #FFFFFF;
  --bg-surface: #F8FAFC;
  --bg-card: #FFFFFF;
  --text-main: #0F172A;
  --text-muted: #475569;
}
```

Dark Mode (`[data-theme="dark"]`):
```css
[data-theme="dark"] {
  --bg-body: #070F1E;
  --bg-surface: #0D192E;
  --bg-card: #13223D;
  --text-main: #F8FAFC;
  --text-muted: #CBD5E1;
  --border-light: #1E355B;
}
```

---

## 04. Client Portal Workspace Features
The Client Portal (`dashboard.html`) operates as an independent workspace with 10 internal tabs:
1. **Overview:** Executive summary with 4 metric cards, real-time audit log, and quick actions.
2. **My Applications:** Searchable and filterable data table tracking MCA SPICe+ and GSTIN filings.
3. **Document Centre:** Interactive demo drag-and-drop file uploader with status verification tags.
4. **Registration Tracker:** 6-step animated progress timeline reflecting statutory milestones.
5. **Compliance Calendar:** Monthly calendar with categorized filter buttons for GST, ROC, and Income Tax deadlines.
6. **My Services:** Overview of active service packages and assigned Company Secretary/CA leads.
7. **Payments & Invoices:** Itemized GST tax invoices and payment status records.
8. **Certificates & Downloads:** Official download links for COI, e-MoA, e-AoA, and company PAN/TAN.
9. **Notifications:** Real-time compliance alerts, statutory notifications, and KYC updates.
10. **Profile & Settings:** Edit executive contact information with localStorage persistence.
11. **Logout Action:** Secure session clearing and redirection.

---

## 05. Responsive Breakpoint Validation
- **Desktop (1440px - 1920px):** Full multi-column 4-card and 3x2 6-card grids.
- **Tablet Landscape (1024px):** Balanced 2x2 grids, compact navigation, zero header crowding.
- **Tablet Portrait (768px):** Refined 2-column grids, smooth hamburger drawer navigation, no overlapping elements.
- **Mobile (320px - 480px):** Single-column stacked layouts, touch-friendly buttons, clamp-based typography.

