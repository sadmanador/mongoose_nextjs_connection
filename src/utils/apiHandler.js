import connectionToDB from "../../config/connection";

export function apiHandler(handler) {
  return async function wrappedHandler(request) {
    try {
      console.log("Connecting to DB...");
      await connectionToDB();
      console.log("DB Connected!");

      return await handler(request);
    } catch (error) {
      console.error("API Handler Error:", error);
      return Response.json(
        {
          error: "Internal server error",
          details: error instanceof Error ? error.message : "",
        },
        { status: 500 }
      );
    }
  };
}
