"""Generates the support-ticket triage dataset for LoRA fine-tuning.

Deterministic (fixed seed) template-driven generation: real, varied training
examples for a narrow task (category + priority + reply), not hand-copied
boilerplate. Produces finetune/data/train.jsonl and finetune/data/valid.jsonl
in mlx_lm's {"prompt", "completion"} completions format.
"""

import json
import random
from pathlib import Path

random.seed(42)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

CATEGORIES = {
    "Hardware": {
        "subjects": [
            "laptop won't turn on",
            "monitor flickering constantly",
            "keyboard keys sticking",
            "headset mic not picking up audio",
            "printer jamming on every print job",
            "mouse cursor freezing randomly",
            "docking station not charging laptop",
            "webcam shows black screen in calls",
            "external hard drive not recognized",
            "laptop fan making loud grinding noise",
            "charger cable frayed and sparking",
            "second monitor won't detect signal",
        ],
        "actions": "escalate to hardware support and arrange a replacement or repair",
        "sla": "1 business day",
    },
    "Software": {
        "subjects": [
            "app crashes every time I open settings",
            "dashboard shows blank page after latest update",
            "export to CSV button does nothing",
            "search feature returns no results for anything",
            "notifications stopped arriving after update",
            "app freezes when uploading large files",
            "dark mode toggle resets on every login",
            "sync between devices is stuck at 0%",
            "reports page throws a 500 error",
            "keyboard shortcuts stopped working",
            "app won't reopen after force-closing",
            "integration with calendar broke overnight",
        ],
        "actions": "route to the engineering on-call queue for investigation",
        "sla": "4 business hours",
    },
    "Billing": {
        "subjects": [
            "charged twice for the same subscription",
            "invoice total doesn't match the quoted price",
            "still being billed after cancelling my plan",
            "refund never showed up after two weeks",
            "unauthorized charge appeared on my card",
            "annual plan charged at the monthly rate",
            "promo code discount wasn't applied",
            "receipt email never arrived after purchase",
            "trial converted to paid without notice",
            "currency shown in invoice is wrong",
            "tax amount looks incorrect on this invoice",
            "downgrade request was never processed",
        ],
        "actions": "loop in billing ops to review the transaction and issue a correction",
        "sla": "2 business days",
    },
    "Account": {
        "subjects": [
            "locked out after too many failed login attempts",
            "password reset email never arrives",
            "two-factor code never gets delivered via SMS",
            "can't change my email address in settings",
            "account shows suspended with no explanation",
            "single sign-on keeps rejecting valid credentials",
            "new teammate invite link says expired",
            "can't remove an old device from trusted list",
            "username change request silently failed",
            "session keeps logging me out every few minutes",
        ],
        "actions": "escalate to account security for manual verification and unlock",
        "sla": "same business day",
    },
    "Shipping": {
        "subjects": [
            "package marked delivered but never arrived",
            "tracking number hasn't updated in a week",
            "received the wrong item in my order",
            "box arrived damaged with items broken inside",
            "order still hasn't shipped after ten days",
            "delivery address was wrong despite correct input",
            "missing one item from a multi-item order",
            "customs held the package with no update",
        ],
        "actions": "coordinate with the shipping carrier and send a replacement if needed",
        "sla": "2 business days",
    },
    "General": {
        "subjects": [
            "would love a dark mode option in the mobile app",
            "just wanted to say the new update looks great",
            "asking whether there's an API for this feature",
            "curious if team plans support more than 10 seats",
            "requesting a feature to export data to Notion",
            "wondering if there's a public roadmap available",
            "asking about enterprise pricing tiers",
            "suggestion: add keyboard shortcut for search",
        ],
        "actions": "log it for the product team's backlog and follow up if it's prioritized",
        "sla": "5 business days",
    },
}

HIGH_PRIORITY_KEYWORDS = [
    "won't turn on", "spark", "500 error", "locked out", "suspended",
    "unauthorized charge", "damaged", "security",
]

OPENERS = [
    "Hi team,", "Hello,", "Hey there,", "To whom it may concern,", "Hi,",
]

CLOSERS = [
    "Please help ASAP.", "Any update would be appreciated.",
    "Let me know what you need from me.", "Thanks in advance.",
    "This is blocking my work.", "Happy to provide more details.",
]


def priority_for(category: str, subject: str) -> str:
    if any(kw in subject for kw in HIGH_PRIORITY_KEYWORDS):
        return "High"
    if category == "General":
        return "Low"
    if category in ("Account", "Billing") and random.random() < 0.4:
        return "High"
    return "Medium"


def make_example(category: str, subject: str) -> dict:
    meta = CATEGORIES[category]
    opener = random.choice(OPENERS)
    closer = random.choice(CLOSERS)
    ticket = f"{opener} {subject[0].upper() + subject[1:]}. {closer}"
    priority = priority_for(category, subject)
    reply = (
        f"Thanks for flagging this — we'll {meta['actions']}. "
        f"Expect an update within {meta['sla']}."
    )
    completion = f" Category: {category} | Priority: {priority} | Reply: {reply}"
    return {"prompt": f"Ticket: {ticket}", "completion": completion}


def main():
    examples = []
    for category, meta in CATEGORIES.items():
        for subject in meta["subjects"]:
            examples.append(make_example(category, subject))
            # Add a light paraphrase variant for more training signal per subject.
            examples.append(make_example(category, subject))

    random.shuffle(examples)

    # Dedupe identical (prompt, completion) pairs that random variation might repeat.
    seen = set()
    unique = []
    for ex in examples:
        key = (ex["prompt"], ex["completion"])
        if key not in seen:
            seen.add(key)
            unique.append(ex)

    split = int(len(unique) * 0.85)
    train, valid = unique[:split], unique[split:]

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(DATA_DIR / "train.jsonl", "w") as f:
        for ex in train:
            f.write(json.dumps(ex) + "\n")
    with open(DATA_DIR / "valid.jsonl", "w") as f:
        for ex in valid:
            f.write(json.dumps(ex) + "\n")

    print(f"Total unique examples: {len(unique)}")
    print(f"Train: {len(train)}  Valid: {len(valid)}")


if __name__ == "__main__":
    main()
