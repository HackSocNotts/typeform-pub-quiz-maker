const fetch = require("node-fetch");

const PERSONAL_ACCESS_TOKEN = "";

const deleteForms = async () => {
  const workspace = await fetch(
    "https://api.typeform.com/forms?search=Question&page=1&page_size=200&workspace_id=xr5597",
    {
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
    }
  ).then((res) => res.json());
  const formIds = workspace.items.map((item) => item.id);

  for (const id of formIds) {
    await fetch(`https://api.typeform.com/forms/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
      },
    });
    console.log("Deleted", id);
  }
};

deleteForms();
