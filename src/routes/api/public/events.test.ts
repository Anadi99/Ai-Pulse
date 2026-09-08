import { describe, it, expect } from "vitest";
import { Schema } from "./events";

describe("Event ingestion API validation (Schema)", () => {
  
  it("accepts a valid event payload", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      category: "Coding",
      duration_seconds: 1200,
      prompt_count: 8,
      started_at: "2026-06-19T10:00:00Z",
      ended_at: "2026-06-19T10:20:00Z",
      metadata: { reason: "tab_switch" },
    });
    expect(result.success).toBe(true);
  });

  it("accepts a minimal valid payload (only required fields)", () => {
    const result = Schema.safeParse({
      platform: "Claude",
      duration_seconds: 60,
    });
    expect(result.success).toBe(true);
  });

  it("rejects payload missing platform", () => {
    const result = Schema.safeParse({
      duration_seconds: 1200,
    });
    expect(result.success).toBe(false);
  });

  it("rejects payload missing duration_seconds", () => {
    const result = Schema.safeParse({
      platform: "Gemini",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty payload", () => {
    const result = Schema.safeParse({});
    expect(result.success).toBe(false);
  });

  it("rejects empty string platform", () => {
    const result = Schema.safeParse({
      platform: "",
      duration_seconds: 100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects platform longer than 50 characters", () => {
    const result = Schema.safeParse({
      platform: "A".repeat(51),
      duration_seconds: 100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-string platform", () => {
    const result = Schema.safeParse({
      platform: 12345,
      duration_seconds: 100,
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-string started_at", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
      started_at: 12345,
    });
    expect(result.success).toBe(false);
  });

  it("accepts payload without timestamps (optional fields)", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
    });
    expect(result.success).toBe(true);
  });

  it("rejects negative duration_seconds", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: -10,
    });
    expect(result.success).toBe(false);
  });

  it("rejects duration_seconds exceeding max (86400)", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 90000,
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer duration_seconds", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 12.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects string duration_seconds instead of number", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: "1200",
    });
    expect(result.success).toBe(false);
  });

  it("rejects non-integer prompt_count", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
      prompt_count: 3.5,
    });
    expect(result.success).toBe(false);
  });

  it("rejects prompt_count exceeding max (1000)", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
      prompt_count: 1500,
    });
    expect(result.success).toBe(false);
  });

  it("defaults prompt_count to 0 when not provided", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.prompt_count).toBe(0);
    }
  });

  it("defaults metadata to empty object when not provided", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.metadata).toEqual({});
    }
  });

  it("rejects invalid metadata type (non-object)", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
      metadata: "not-an-object",
    });
    expect(result.success).toBe(false);
  });

  it("allows category to be null", () => {
    const result = Schema.safeParse({
      platform: "ChatGPT",
      duration_seconds: 100,
      category: null,
    });
    expect(result.success).toBe(true);
  });
});