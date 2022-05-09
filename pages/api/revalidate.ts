import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // you can replace it with the path you want to update

    const path = "/on-demand";

    await res.unstable_revalidate(path);
    return res.json({ revalidated: true, path });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
