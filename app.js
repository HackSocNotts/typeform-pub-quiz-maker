const fetch = require("node-fetch");

const PERSONAL_ACCESS_TOKEN = "";
const max = 100;
const min = 1;

const headers = {
  Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
  "Content-Type": "application/json",
};

const makePayload = (index = max, nextForm) => ({
  title: `Question ${index}`,
  type: "form",
  settings: {
    language: "en",
    is_public: true,
    progress_bar: "percentage",
    show_progress_bar: false,
    show_typeform_branding: true,
    show_time_to_complete: false,
    meta: {
      allow_indexing: false,
    },
  },
  theme: {
    href: "https://api.typeform.com/themes/ioH8Hm",
  },
  workspace: {
    href: "https://api.typeform.com/workspaces/xr5597",
  },
  hidden: ["ticketreference", "teamname"],
  welcome_screens: [
    {
      title: `Question ${index}`,
      properties: {
        description: "{{hidden:teamname}}",
        show_button: true,
        button_text: "Start",
      },
      attachment: {
        type: "image",
        href: "https://images.typeform.com/images/mbdN6ARMrY4P",
      },
    },
  ],
  thankyou_screens: [
    {
      title: nextForm
        ? "On to the next question!"
        : "Thanks for completing the pub quiz.",
      properties: nextForm
        ? {
            show_button: true,
            button_text: "Continue",
            button_mode: "redirect",
            redirect_url: `https://hacksoc.typeform.com/to/${nextForm}?teamname={{hidden:teamname}}&ticketreference={{hidden:ticketreference}}`,
            share_icons: false,
          }
        : {
            show_button: false,
          },
      attachment: {
        type: "image",
        href: "https://images.typeform.com/images/mbdN6ARMrY4P",
      },
    },
  ],
  fields: [
    {
      title: "Enter your answer",
      type: "short_text",
      validations: {
        required: false,
      },
    },
  ],
});

const makeForms = async (nextForm = null, index = max, minIndex = min) => {
  const form = await fetch("https://api.typeform.com/forms", {
    method: "POST",
    body: JSON.stringify(makePayload(index, nextForm)),
    headers,
  }).then((res) => res.json());

  console.log(`Made form ${index}`, form._links.display);

  if (index === min) {
    return;
  }

  return makeForms(form.id, index - 1, minIndex);
};

makeForms();
