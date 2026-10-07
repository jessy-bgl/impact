import {
  createBeforeSend,
  MAX_EXCEPTION_MESSAGE_LENGTH,
} from "@common/config/posthogBeforeSend";

describe("createBeforeSend", () => {
  it("tags every event with the environment", () => {
    const beforeSend = createBeforeSend("development");

    const result = beforeSend({
      event: "action_started",
      properties: { foo: "bar" },
    });

    expect(result?.properties).toEqual({
      foo: "bar",
      environment: "development",
    });
  });

  it("truncates long exception messages", () => {
    const beforeSend = createBeforeSend("production");
    const longMessage = "x".repeat(MAX_EXCEPTION_MESSAGE_LENGTH + 10);

    const result = beforeSend({
      event: "$exception",
      properties: { $exception_list: [{ value: longMessage }] },
    });

    expect(result?.properties?.$exception_list).toEqual([
      { value: `${"x".repeat(MAX_EXCEPTION_MESSAGE_LENGTH)}…` },
    ]);
    expect(result?.properties?.environment).toBe("production");
  });

  it("keeps short exception messages untouched", () => {
    const beforeSend = createBeforeSend("production");

    const result = beforeSend({
      event: "$exception",
      properties: { $exception_list: [{ value: "profile_sync_failed" }] },
    });

    expect(result?.properties?.$exception_list).toEqual([
      { value: "profile_sync_failed" },
    ]);
  });

  it("passes a dropped event through", () => {
    expect(createBeforeSend("production")(null)).toBeNull();
  });
});
