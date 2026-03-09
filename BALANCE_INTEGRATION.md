# OTC Card Balance Check - Integration Plan

## Overview
Add a "Check My Balance" feature to PatriotOTC that lets members instantly view their OTC benefit card balance. The feature routes balance queries to the correct platform provider based on the member's insurance carrier.

## Current Status
- [x] "Check My Balance" link added to top nav (Header.tsx)
- [x] `/balance` page created with BalanceChecker component
- [x] `/api/balance` API route created with mock responses
- [x] Carrier-to-platform routing logic implemented
- [ ] InComm Healthcare API integration (real)
- [ ] NationsBenefits API integration (real)
- [ ] Healthy Benefits Plus fallback
- [ ] BIN-based card routing (auto-detect carrier from card number)

---

## Architecture

```
User enters card number + selects carrier
          |
    /api/balance (Next.js API route)
          |
    Route by carrier:
    +-- Humana, Aetna, UHC --> InComm Healthcare API
    +-- Anthem, Wellcare   --> NationsBenefits API
    +-- Fallback           --> Healthy Benefits Plus
          |
    Return: balance, wallets, transaction history
```

## Platform Provider Details

### 1. InComm Healthcare (Humana, Aetna, UHC)
- **Developer Portal**: https://developer.incomm.com
- **API Suite**:
  - Card & Wallet Management: auth, activation, balance, replacements
  - Member Information: profiles, eligibility, real-time data
  - Transactions & Rewards: history, rewards loading
  - Retail & Product Tools: scanning, search, store locator
- **Auth**: OAuth2 (partnership agreement required)
- **Action Items**:
  1. Register at developer.incomm.com
  2. Request API access / partnership agreement
  3. Get OAuth2 client credentials
  4. Implement balance inquiry endpoint
  5. Add env vars: `INCOMM_CLIENT_ID`, `INCOMM_CLIENT_SECRET`, `INCOMM_API_URL`

### 2. NationsBenefits (Anthem, Wellcare)
- **Member Portal**: https://MyBenefits.NationsBenefits.com
- **Platform**: Benefits Pro Portal & App
- **Features**: Live balance, transaction history, card activation
- **Auth**: Partnership agreement required
- **Action Items**:
  1. Contact NationsBenefits for API partnership
  2. Get API credentials and documentation
  3. Implement balance inquiry endpoint
  4. Add env vars: `NATIONS_API_KEY`, `NATIONS_API_URL`

### 3. Healthy Benefits Plus / Conduent (Fallback)
- **Portal**: https://healthybenefitsplus.com
- **Used by**: Some Humana and Wellcare plans as alternate
- **Action Items**:
  1. Investigate API availability
  2. May require web scraping or partnership

---

## Tasks for Gemini

### API Integration Layer
1. Register at `developer.incomm.com` and document the auth flow
2. Build the InComm API client in `lib/incomm.ts`:
   - OAuth2 token management with refresh
   - Balance inquiry by card number
   - Wallet breakdown (OTC, grocery, utilities)
   - Transaction history
3. Build BIN routing table (`lib/bin-router.ts`):
   - Map first 6 digits of card to carrier/platform
   - Auto-detect carrier so user doesn't have to select manually
4. Contact NationsBenefits for API documentation
5. Build NationsBenefits client in `lib/nationsbenefits.ts`
6. Add rate limiting and caching to `/api/balance`

---

## Tasks for Claude

### UI/UX & Frontend
1. Enhance BalanceChecker component:
   - Add card number auto-detection (show carrier logo as user types)
   - Add loading skeleton states
   - Add transaction history tab
   - Add "Download Statement" PDF option
2. Create mobile-responsive balance card design
3. Add balance check to the homepage hero section as a quick-access widget
4. Implement error states for:
   - Invalid card number
   - Card not found
   - API timeout
   - Carrier API down
5. Add accessibility improvements (screen reader announcements for balance)

---

## Environment Variables Needed

```env
# InComm Healthcare API (Humana, Aetna, UHC)
INCOMM_CLIENT_ID=
INCOMM_CLIENT_SECRET=
INCOMM_API_URL=https://api.incomm.com/healthcare/v1

# NationsBenefits API (Anthem, Wellcare)
NATIONS_API_KEY=
NATIONS_API_URL=https://api.nationsbenefits.com/v1

# Healthy Benefits Plus (fallback)
HBP_API_KEY=
HBP_API_URL=
```

## Security Considerations
- Card numbers are NEVER stored in database or logs
- Card numbers cleared from client state after API call
- All API calls over HTTPS
- Rate limiting: max 10 balance checks per IP per minute
- Input validation: numeric only, 16-19 digit card numbers

## Timeline
1. **Week 1**: Finalize InComm partnership, get API credentials
2. **Week 2**: Build InComm integration, test with sandbox
3. **Week 3**: NationsBenefits partnership and integration
4. **Week 4**: BIN routing, error handling, QA testing
5. **Week 5**: Launch to production
