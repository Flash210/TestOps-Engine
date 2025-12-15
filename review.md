# Code Review Template — Senior QA Automation Engineer

## Purpose
Perform a comprehensive code review focusing on:
- Code quality & maintainability
- Correctness & reliability
- Testability & automation readiness
- Security vulnerabilities
- Performance issues
- Misuse of patterns, frameworks, or best practices
- Classification of issues by severity

---

## Instructions to Reviewer
Analyze the provided code with the mindset of a **Senior QA Automation Engineer** and produce the following output.

---

## 1. Summary Overview
Provide:
- High-level description of the code
- Areas of concern
- General stability and quality assessment

---

## 2. Issue Classification

### 🔥 Critical Issues
- System failures, data corruption, security leaks
- Flaky or unreliable logic
- Deadlocks, race conditions, unhandled exceptions
- Broken core functionality
- Missing input validation
- High-risk automation blockers

### ⚠️ Major Issues
- Poor architecture or bad design patterns
- Misuse of API/framework
- Inefficient logic
- Hard-to-maintain structures
- Missing test coverage in important areas
- Incorrect async/concurrency usage
- Automation test design weaknesses

### ℹ️ Minor Issues
- Styling, formatting, naming inconsistencies
- Code smells
- Low-impact inefficiencies
- Non-blocking improvements

---

## 3. Detailed Findings Table

| Severity | Category | Description | File/Function | Suggested Fix |
|---------|----------|-------------|---------------|----------------|
| Critical/Major/Minor | Logic/Security/Performance/Reliability/Automation/Style | Issue explanation | Location | Clear recommendation |

---

## 4. Testability & Automation Review
Evaluate:
- Is the code testable?
- Missing unit tests?
- Missing integration tests?
- Gaps in negative testing?
- Potential flaky scenarios?
- Areas lacking mocks/stubs?
- Automation opportunities?

---

## 5. Security & Reliability Review
Identify:
- Input validation issues
- Unsafe operations
- Dependency misuse
- Data exposure risks
- Concurrency hazards
- Poor exception handling

---

## 6. Performance Review
Check for:
- Expensive loops or recursion
- Inefficient I/O
- Redundant network calls
- Memory mismanagement
- Missing caching

---

## 7. Suggestions for Improvement
Provide an actionable improvement list:
- Refactoring opportunities
- Cleanup recommendations
- Best practices
- Patterns to avoid or adopt

---

## 8. Code Quality Score
Rate the overall code quality (0–10):
- 0–3: Needs urgent refactor
- 4–6: Acceptable with improvements
- 7–8: Good with minor issues
- 9–10: Excellent

---

## 9. Final Recommendation
Choose one:
- **Approve**
- **Approve with minor changes**
- **Request changes**
- **Block – critical issues found**