# Before / After: Support-Ticket Triage LoRA Fine-Tune

Base model: `mlx-community/Hermes-3-Llama-3.2-3B-4bit` (no adapter) vs. the same model with the LoRA adapter
trained in this session (`finetune/adapters/adapters.safetensors`).
Held-out prompts below are from `finetune/data/valid.jsonl` — not seen during training.

## Example 1
**Prompt:** `Ticket: Hi team, Trial converted to paid without notice. Happy to provide more details.`

**Base model (no fine-tune):**
```
Category: Ticket
Priority: Low
Reply: Category: Support - Billing and Payments | Priority: Low | Reply: Category: Billing and Payments | Priority: Low | Repy: Ticket: Hi, in the interest of being proactive, I understand that you are experiencing an issue where your trial account has been automatically converted to a paid subscription without prior notice. I have prepared a support ticket for you to look into this further. Please find below the details:

1. Ticket ID: [Unique ID]
2. Description: Trial account converted to paid subscription without prior notice.
3. Customer Name:
```

**Fine-tuned (LoRA adapter):**
```
Category: Billing | Priority: High | Reply: Thanks for flagging this — we'll loop in billing ops to review the transaction and issue a correction. Expect an update within 2 business days.
```

## Example 2
**Prompt:** `Ticket: Hey there, Charger cable frayed and sparking. Let me know what you need from me.`

**Base model (no fine-tune):**
```
Category: Electronics | Priority: Low | Reply:
Category: Power Cable Replacement | Priority: Low | Reply:
Cher:    Re:  Charger Cable Fraying and Sparking

As per your request, we will proceed with the Power Cable Replacement support ticket. 

At this point, we would appreciate some more information from you:

1. The make and model of the device you are using the charger cable with.
2. The brand and model of the charger cable itself.
3. The charger cable's serial number, if available.

This information will help us to
```

**Fine-tuned (LoRA adapter):**
```
Category: Hardware | Priority: High | Reply: Thanks for flagging this — we'll escalate to hardware support and arrange a replacement or repair. Expect an update within 1 business day.
```

## Example 3
**Prompt:** `Ticket: Hi, Currency shown in invoice is wrong. Please help ASAP.`

**Base model (no fine-tune):**
```
Category: Finance | Priority: High | Reply: We have received your request. In the category of Finance, the priority has been set to High. We are currently looking into the issue of the incorrect currency shown on your invoice. Please expect a response shortly with further instructions.
```

**Fine-tuned (LoRA adapter):**
```
Category: Billing | Priority: High | Reply: Thanks for flagging this — we'll loop in billing ops to review the transaction and issue a correction. Expect an update within 2 business days.
```

## Example 4
**Prompt:** `Ticket: Hi, Promo code discount wasn't applied. Please help ASAP.`

**Base model (no fine-tune):**
```
Category: E-commerce | Priority: High | Reply: To help you promptly, I've gone ahead and created a support ticket for you. 
Category: Discount Codes | Priority: High | Reply: T
```

**Fine-tuned (LoRA adapter):**
```
Category: Billing | Priority: High | Reply: Thanks for flagging this — we'll loop in billing ops to review the transaction and issue a correction. Expect an update within 2 business days.
```
