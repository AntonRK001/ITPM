const { test } = require("@playwright/test");
const { time } = require("node:console");

const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
};

// Helper: type word by word with space
async function typeWithSpaces(textarea, sentence) {
  const words = sentence.split(" ");
  for (const word of words) {
    await textarea.type(word + " ", { delay: 250 }); // small delay helps AI process
  }
}

test("Tamil Transliteration - Sequential Tests", async ({ page }) => {
  test.setTimeout(600000);
  await page.goto("https://tamil.changathi.com/");
  const textarea = page.locator("#transliterateTextarea");

  const tests = [
    // ===== SHORT (≤ 30 chars) =====
    {
      id: "Pos_Fun_0001",
      input: "vanakkam, eppadi irukeenga?",
      expected: "வணக்கம், எப்படி இருக்கீங்க?",
    },
    {
      id: "Pos_Fun_0002",
      input: "konjam udhavi pannuveenga?",
      expected: "கொஞ்சம் உதவி பண்ணுவீங்க?",
    },
    {
      id: "Pos_Fun_0003",
      input: "seekiram vaa!",
      expected: "சீக்கிரம் வா!",
    },
    {
      id: "Pos_Fun_0004",
      input: "naan ippo varala.",
      expected: "நான் இப்போ வரல.",
    },
    {
      id: "Pos_Fun_0006",
      input: "sari sari, naan varen.",
      expected: "சரி சரி, நான் வரேன்.",
    },
    {
      id: "Pos_Fun_0007",
      input: "naan netru veetukku ponen.",
      expected: "நான் நேற்று வீட்டுக்கு போனேன்.",
    },
    {
      id: "Pos_Fun_0008",
      input: "nee naalai varuviyaa?",
      expected: "நீ நாளை வருவியா?",
    },
    {
      id: "Pos_Fun_0009",
      input: "avanga innaiku varamaattaanga.",
      expected: "அவங்க இன்னைக்கு வரமாட்டாங்க.",
    },
    {
      id: "Pos_Fun_0013",
      input: "naan inge irukken.",
      expected: "நான் இங்கே இருக்கேன்.",
    },
    {
      id: "Pos_Fun_0014",
      input: "naanga serndhu saapidurom.",
      expected: "நாங்க சேர்ந்து சாப்பிடுறோம்.",
    },
    {
      id: "Pos_Fun_0015",
      input: "ava nethu pesala.",
      expected: "அவ நேத்து பேசல.",
    },
    {
      id: "Pos_Fun_0019",
      input: "nee naalaikku varuva, sariyaa?",
      expected: "நீ நாளைக்கு வருவா, சரியா?",
    },
    {
      id: "Pos_Fun_0020",
      input: "idhu atha vida nalladhu.",
      expected: "இது அத விட நல்லது.",
    },
    {
      id: "Neg_Fun_0001",
      input: "Hi, how are you today?",
      expected: "ஹாய், இன்று எப்படி இருக்கிறீர்கள்?",
    },
    {
      id: "Neg_Fun_0002",
      input: "pls hlp me asap!",
      expected: "தயவு செய்து எனக்கு உடனே உதவி செய்யுங்கள்!",
    },
    {
      id: "Neg_Fun_0005",
      input: "naan p@ssw0rd marandhuten.",
      expected: "நான் கடவுச்சொல்லை மறந்துவிட்டேன்.",
    },
    {
      id: "Pos_UI_0001",
      input: "naan veetukku poren",
      expected: "நான் வீட்டுக்கு போறேன்",
    },

    // ===== MEDIUM (31–299 chars) =====
    {
      id: "Pos_Fun_0005",
      input: "naan veetukku poren, aana innaiku mazhai peiyudhu.",
      expected: "நான் வீட்டுக்கு போறேன், ஆனா இன்னைக்கு மழை பெய்யுது.",
    },
    {
      id: "Pos_Fun_0010",
      input: "nee seekiram mudichaa, naama udane veliya pogalaam.",
      expected: "நீ சீக்கிரம் முடிச்சா, நாம உடனே வெளிய போகலாம்.",
    },
    {
      id: "Pos_Fun_0011",
      input: "naan velaiya mudikkala, eennaa romba kalaippaa irundhuchu.",
      expected: "நான் வேலைய முடிக்கல, ஏன்னா ரொம்ப களைப்பா இருந்துச்சு.",
    },
    {
      id: "Pos_Fun_0012",
      input:
        "Enkeyoo paartha japakam, unnai naan netru munthinam kanavil kanden.",
      expected:
        "எங்கேயோ பார்த்த ஜாபகம், உன்னை நான் நேற்று முன்தினம் கனவில் கண்டேன்.",
    },
    {
      id: "Pos_Fun_0016",
      input: "nee sonnaa, naan kandippaa varuven.",
      expected: "நீ சொன்னா, நான் கண்டிப்பா வருவேன்.",
    },
    {
      id: "Pos_Fun_0017",
      input: "avan seekiram thoonginaan, yenna romba kalaippaa irundhuchu.",
      expected: "அவன் சீக்கிரம் தூங்கினான், என்ன ரொம்ப களைப்பா இருந்துச்சு.",
    },
    {
      id: "Pos_Fun_0021",
      input: "avan ellaaraiyum vida romba nallavan.",
      expected: "அவன் எல்லாரையும் விட ரொம்ப நல்லவன்.",
    },
    {
      id: "Pos_Fun_0022",
      input: "naanga maduraila irunthu kandy pogalaamnu yosichom.",
      expected: "நாங்க மதுரைல இருந்து கண்டி போகலாம்னு யோசிச்சோம்.",
    },
    {
      id: "Pos_Fun_0023",
      input:
        "avan sandhoshamaa sirichaan; ellaarum atha paathu magizhndhaanga!",
      expected: "அவன் சந்தோஷமா சிரிச்சான்; எல்லாரும் அத பாத்து மகிழ்ந்தாங்க!",
    },
    {
      id: "Neg_Fun_0003",
      input: "@Ravi order #204.5 ready? dm me now :)",
      expected: "@ரவி, ஆர்டர் #204.5 தயார் தானா? இப்போ எனக்கு செய்தி அனுப்பு.",
    },
    {
      id: "Neg_Fun_0004",
      input: "Meeting on 31/12/2026 at 10:30 AM; pay Rs.2500 before Friday.",
      expected:
        "31/12/2026 அன்று 10:30 AM-க்கு கூட்டம்; வெள்ளிக்குள் ரூ.2500 செலுத்துங்கள்.",
    },
    {
      id: "Neg_Fun_0006",
      input:
        "details https://example.com la irukku, mail anuppunga test@mail.com ku.",
      expected:
        "விவரங்கள் https://example.com இல் உள்ளது, test@mail.com க்கு மின்னஞ்சல் அனுப்புங்கள்.",
    },
    {
      id: "Neg_Fun_0007",
      input: "enna idhu!!! romba worst aa irukku 😡😡???",
      expected: "இது என்ன!!! ரொம்ப மோசமாக இருக்கிறது 😡😡???",
    },
    {
      id: "Neg_Fun_0008",
      input: "naanveetukkuporenadhunaalaneeyumvarala",
      expected: "நான் வீட்டுக்கு போகிறேன் அதனால் நீயும் வரல.",
    },

    // ===== LONG (≥ 300 chars) =====
    {
      id: "Pos_Fun_0018",
      input:
        "innaiku kaalaila naan ezhundhu kulichu saapittu veetla irundhen, " +
        "appuram konjam neram oivu eduthen.",
      expected:
        "இன்னைக்கு காலைல நான் எழுந்து குளிச்சு சாப்பிட்டு வீட்ல இருந்தேன், " +
        "அப்புறம் கொஞ்சம் நேரம் ஓய்வு எடுத்தேன்.",
    },
    {
      id: "Pos_Fun_0024",
      input:
        "innaiku kaalaila naan romba seekiramaa ezhundhen, appuram amaidhiya kulichu saapitten, " +
        "veetla irukkura ellaarodaiyum konjam neram pesinen, adutha vela enna seiyanum nu yosichen, " +
        "porumaiyaa thittam pottu ella velaiyaiyum ondra ondra mudichittu saayngaalam konjam nadandhu, " +
        "manasa amaidhiya vachitu irundhen.",
      expected:
        "இன்னைக்கு காலைல நான் ரொம்ப சீக்கிரமா எழுந்தேன், அப்புறம் அமைதியா குளிச்சு சாப்பிட்டேன், " +
        "வீட்ல இருக்குற எல்லாரோடையும் கொஞ்சம் நேரம் பேசினேன், அடுத்த வேல என்ன செய்யணும் னு யோசிச்சேன், " +
        "பொறுமையா திட்டம் போட்டு எல்லா வேலையையும் ஒன்றை ஒன்றை முடிச்சிட்டு சாயங்காலம் கொஞ்சம் நடந்து, " +
        "மனச அமைதியா வச்சிட்டு இருந்தேன்.",
    },
    {
      id: "Neg_Fun_009",
      input:
        'if (user == "admin") { allowAccess(); } else { denyAccess(); } ' +
        "please check logic and update before deployment, illaatti system crash aagum nu bayam.",
      expected:
        "பயனர் நிர்வாகி என்றால் அனுமதி வழங்கவும், இல்லையெனில் மறுக்கவும்; " +
        "வெளியீட்டுக்கு முன் தர்க்கத்தை சரிபார்க்கவும், இல்லையெனில் அமைப்பு செயலிழக்கும் என்ற பயம்.",
    },
  ];

  for (let i = 0; i < tests.length; i++) {
    const { id, input, expected } = tests[i];

    // Clear textarea
    await textarea.fill("");

    // Type word by word with space to trigger Tamil transliteration
    await typeWithSpaces(textarea, input);

    // Wait until AI transliteration produces Tamil text
    await page.waitForFunction(
      (selector, originalText) => {
        const ta = document.querySelector(selector);
        // Wait until it contains at least one Tamil character
        return ta && /[\u0B80-\u0BFF]/.test(ta.value);
      },
      "#transliterateTextarea",
      input,
    );

    // Get the output
    const output = await textarea.inputValue();

    if (output.includes(expected)) {
      console.log(
        colors.green(
          `✅ [${id}] Test ${i + 1} Passed: "${input}" | Output: "${output}"`,
        ),
      );
    } else {
      console.log(
        colors.red(
          `❌ [${id}] Test ${i + 1} Failed: "${input}" | Output: "${output}" | Expected contains: "${expected}"`,
        ),
      );
    }

    // Clear textarea for next test
    await textarea.click();
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Backspace");
  }
});
