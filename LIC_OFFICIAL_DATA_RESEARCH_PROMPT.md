# LIC Official Data Collection Prompt (Premium Tables + Underwriting + Rider Matrices)

## Objective
Collect a **complete, authoritative, and implementation-ready LIC dataset** for all active retail plans, with:
1. Plan-specific premium tables (by age/term/mode/PPT/SA band)
2. Underwriting rules (eligibility, loading, restrictions, documentation)
3. Rider rule matrices (availability, limits, pricing logic, conditions)

The output must be accurate enough to support **binding-grade quote computation** (or clearly flag where only indicative quotes are possible).

---

## Scope
### Include all **active** LIC retail plans across categories:
- Endowment
- Money Back
- Whole Life
- Child
- Term
- Pension/Annuity
- ULIP
- Micro Insurance

### Per plan, capture:
- Official plan name
- Plan number
- Category/type
- Status (active/suspended/withdrawn)
- Effective date and last revision date
- Official source URLs and document IDs

---

## Source Priority (strict)
Use sources in this order:
1. **LIC official documents/pages only** (primary)
2. LIC circulars / product brochures / sales literature (official)
3. Regulator references only for interpretation (IRDAI/GST/Income Tax)

Do **not** use aggregator websites as source-of-truth for rates/rules.

---

## Required Data Schema
Return data in structured JSON/CSV and a data dictionary.

### A) Plan Master
For each plan:
- `planNo`
- `name`
- `category`
- `isActive`
- `sourceRefs[]`
- `lastVerifiedDate`
- `versionTag`

### B) Eligibility Matrix
Per plan:
- Min/max entry age (with age basis: last birthday / nearest birthday)
- Min/max maturity age
- Allowed policy terms
- Allowed premium paying terms
- Min/max sum assured
- Min/max premium (if any)
- Gender/smoker influence flags
- Occupation restrictions
- Medical/non-medical thresholds

### C) Premium Tables (Core)
Per plan and variant:
- Base premium rates by:
  - Age
  - Term
  - Premium paying term
  - Sum assured band (or per-thousand rate)
  - Mode (YLY/HLY/QLY/MLY/SSS)
- Mode factors or mode-specific tables
- Rebate/loadings:
  - High SA rebates (slabs)
  - Mode rebates/loadings
  - Staff/other rebates if applicable
- Variant distinctions (regular/single premium, option A/B etc.)

### D) Rider Matrices
For each rider applicable to each plan:
- Rider name/code
- Eligibility age limits
- Rider term and co-termination rules
- Min/max rider SA
- Rider SA linkage to base SA
- Rider premium rate table / formula
- Plan-rider compatibility matrix
- Exclusions/waiting/ceasing conditions

### E) Underwriting Rules
Per plan:
- Age proof standards
- Income proof requirements
- Occupational class handling
- Medical test grid by age/SA
- Extra mortality loading rules
- Substandard decision logic (postponement/decline/loadings)
- Special conditions (smoker declaration, female lives, high-risk occupation)

### F) Tax/GST/Regulatory Treatment (dated)
Per plan/rider/premium component:
- GST treatment with effective dates
- 80C/80D/10(10D) applicability rules and caveats
- Date-based rule changes (with exact effective date)

### G) Benefit Logic Tables
Per plan:
- Bonus rates (historical series with year)
- Loyalty additions / FAB rules
- Survival benefit schedule
- Death benefit formula variants
- Maturity formula variants

---

## Output Format Requirements
Provide all outputs:

1. `plan_master.json`
2. `eligibility_matrix.json`
3. `premium_tables/` (one file per plan, machine-friendly)
4. `rider_matrix.json`
5. `underwriting_rules.json`
6. `tax_gst_rules.json`
7. `benefit_logic.json`
8. `source_manifest.csv` with:
   - document title
   - URL
   - publication/effective date
   - checksum/hash (if file)
   - extracted sections
9. `conflicts_and_gaps.md` with unresolved ambiguities and missing fields

---

## Quality & Verification Rules
- Every numeric table must be traceable to an official source line/table/page.
- Include extraction provenance at row level where possible (`sourceDoc`, `page`, `tableRef`).
- Flag inferred values explicitly (`isInferred=true`) and explain methodology.
- No silent assumptions.
- If a plan has multiple option variants, separate them explicitly.
- If different official docs conflict, keep both and mark one as preferred with reason.

---

## Acceptance Criteria
Dataset is accepted only if:
1. All active plans are present and correctly categorized.
2. Every plan has complete premium computation inputs (or explicit gap notes).
3. Rider compatibility and pricing are machine-readable.
4. Underwriting and loading rules are sufficiently explicit to implement rule engine checks.
5. All data points can be audited back to official LIC source references.

---

## Delivery Instructions
Bundle final delivery as:
- `/data_raw/` (original official files)
- `/data_processed/` (normalized JSON/CSV)
- `/docs/` (dictionary + conflicts + methodology)

Also include a short `IMPLEMENTATION_NOTES.md` with:
- Known blockers for production-grade premium computation
- Suggested fallback logic where official granular table is missing
- Plan-wise confidence score (High/Medium/Low)
