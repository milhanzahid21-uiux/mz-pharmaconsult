/*
 * MZ PharmaConsult — Curated question bank (offline fallback + cost-free mode).
 *
 * HOW TO ADD A QUESTION
 * ---------------------
 * Copy one object below and edit the fields. The shape is:
 *
 *   {
 *     subject:     "Pharmacology",      // must match a subject in the SUBJECTS list (app.js)
 *     style:       "scenario",          // "scenario" or "simple"
 *     difficulty:  "Moderate",          // "Easy" | "Moderate" | "Hard"
 *     scenario:    "A 70-year-old ...", // the vignette; use "" for simple-style questions
 *     question:    "Which ... ?",       // the actual question stem
 *     options:     ["..","..","..",".."], // EXACTLY 4 options, NOT pre-lettered (no "A.", "B.")
 *     correctIndex: 1,                  // 0-based index of the correct option (0..3)
 *     explanation: "Why right, why the main distractors are wrong (2-3 sentences)."
 *   }
 *
 * HOW TO ADD A SUBJECT
 * --------------------
 * Add the subject name to the SUBJECTS array in app.js, then add questions here
 * with that exact subject string. The subject chips are driven by that array.
 *
 * Accuracy matters: these are the offline fallback AND the no-AI mode, so vet
 * every question before students use them.
 */
window.QUESTION_BANK = [
  /* ===================== PHARMACOLOGY ===================== */
  {
    subject: "Pharmacology",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A 68-year-old man with atrial fibrillation is stabilised on warfarin (INR 2.5). He develops a chest infection and his GP prescribes a course of an antibiotic. Two weeks later he presents with bruising and an INR of 6.8.",
    question: "Which antibiotic most likely precipitated this rise in INR?",
    options: ["Co-trimoxazole", "Cefalexin", "Nitrofurantoin", "Fosfomycin"],
    correctIndex: 0,
    explanation:
      "Co-trimoxazole inhibits CYP2C9 and displaces warfarin from protein binding, markedly potentiating its anticoagulant effect and raising the INR. The other agents have little clinically significant effect on warfarin metabolism.",
  },
  {
    subject: "Pharmacology",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which receptor does salbutamol primarily act on to produce bronchodilation?",
    options: ["Beta-1 adrenergic", "Beta-2 adrenergic", "Muscarinic M3", "Alpha-1 adrenergic"],
    correctIndex: 1,
    explanation:
      "Salbutamol is a selective beta-2 adrenergic agonist; stimulation relaxes bronchial smooth muscle. Beta-1 stimulation affects the heart, while M3 blockade (not agonism) and alpha-1 effects are unrelated to its mechanism.",
  },
  {
    subject: "Pharmacology",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "The therapeutic effect of omeprazole is best described by which mechanism?",
    options: [
      "Competitive H2-receptor antagonism",
      "Irreversible inhibition of the H+/K+ ATPase",
      "Neutralisation of gastric acid",
      "Coating of the gastric mucosa",
    ],
    correctIndex: 1,
    explanation:
      "Omeprazole is a proton pump inhibitor that irreversibly blocks the H+/K+ ATPase on the parietal cell, the final step in acid secretion. H2 antagonism describes ranitidine, neutralisation describes antacids, and mucosal coating describes sucralfate.",
  },
  {
    subject: "Pharmacology",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A patient on a stable dose of phenytoin for epilepsy is started on a new medicine. Within days the phenytoin level rises into the toxic range and the patient becomes ataxic with nystagmus.",
    question: "Which co-prescribed drug is the most likely cause?",
    options: ["Rifampicin", "Carbamazepine", "Fluconazole", "Phenobarbital"],
    correctIndex: 2,
    explanation:
      "Fluconazole inhibits CYP2C9, the main enzyme metabolising phenytoin, raising its level into the toxic range. Rifampicin, carbamazepine and phenobarbital are enzyme inducers and would lower phenytoin levels instead.",
  },
  {
    subject: "Pharmacology",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which of the following is a recognised mechanism of action of aspirin's antiplatelet effect?",
    options: [
      "Reversible inhibition of COX-2",
      "Irreversible acetylation of platelet COX-1",
      "Blockade of the platelet ADP (P2Y12) receptor",
      "Inhibition of glycoprotein IIb/IIIa",
    ],
    correctIndex: 1,
    explanation:
      "Low-dose aspirin irreversibly acetylates COX-1 in platelets, blocking thromboxane A2 synthesis for the platelet's lifespan. P2Y12 blockade describes clopidogrel and GP IIb/IIIa inhibition describes abciximab.",
  },
  {
    subject: "Pharmacology",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A 55-year-old diabetic patient on metformin is found to have an eGFR that has fallen to 25 mL/min/1.73m². He is admitted for an emergency contrast-enhanced CT scan.",
    question: "What is the primary concern with continuing metformin in this setting?",
    options: [
      "Hypoglycaemia",
      "Lactic acidosis",
      "Hepatotoxicity",
      "QT prolongation",
    ],
    correctIndex: 1,
    explanation:
      "Metformin is renally cleared; in significant renal impairment or with iodinated contrast it can accumulate and precipitate lactic acidosis. Metformin alone rarely causes hypoglycaemia, and hepatotoxicity and QT prolongation are not characteristic risks.",
  },
  {
    subject: "Pharmacology",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Naloxone reverses opioid overdose by acting as a:",
    options: [
      "Partial mu-opioid agonist",
      "Competitive mu-opioid antagonist",
      "GABA-A agonist",
      "NMDA receptor antagonist",
    ],
    correctIndex: 1,
    explanation:
      "Naloxone is a competitive antagonist at mu-opioid receptors, displacing opioids and rapidly reversing respiratory depression. It has no agonist activity, which distinguishes it from buprenorphine (a partial agonist).",
  },

  /* ===================== PHARMACOGNOSY ===================== */
  {
    subject: "Pharmacognosy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Digoxin, a cardiac glycoside, is obtained from which plant?",
    options: ["Digitalis lanata", "Atropa belladonna", "Cinchona officinalis", "Papaver somniferum"],
    correctIndex: 0,
    explanation:
      "Digoxin is a cardiac glycoside derived from Digitalis lanata (woolly foxglove). Atropa belladonna yields atropine, Cinchona yields quinine, and Papaver somniferum yields opium alkaloids.",
  },
  {
    subject: "Pharmacognosy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which chemical test is commonly used to detect the presence of alkaloids in a crude drug extract?",
    options: ["Molisch's test", "Mayer's reagent", "Fehling's test", "Biuret test"],
    correctIndex: 1,
    explanation:
      "Mayer's reagent (potassium mercuric iodide) gives a cream precipitate with alkaloids and is a standard alkaloid screening test. Molisch's detects carbohydrates, Fehling's detects reducing sugars, and the Biuret test detects proteins.",
  },
  {
    subject: "Pharmacognosy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A pharmacognosy student is given a crude drug that, on thin-layer chromatography and chemical testing, shows a bitter principle used clinically as an antimalarial. The source bark is from a South American tree.",
    question: "The active constituent and its source are most likely:",
    options: [
      "Morphine from Papaver somniferum",
      "Quinine from Cinchona bark",
      "Reserpine from Rauwolfia serpentina",
      "Vincristine from Catharanthus roseus",
    ],
    correctIndex: 1,
    explanation:
      "Quinine is a bitter alkaloid obtained from Cinchona bark and historically a key antimalarial. Morphine is an analgesic, reserpine an antihypertensive, and vincristine an anticancer vinca alkaloid.",
  },
  {
    subject: "Pharmacognosy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Senna, used as a stimulant laxative, owes its activity to which class of glycosides?",
    options: ["Cardiac glycosides", "Cyanogenic glycosides", "Anthraquinone glycosides", "Saponin glycosides"],
    correctIndex: 2,
    explanation:
      "Senna contains anthraquinone (sennoside) glycosides that stimulate colonic motility, producing a laxative effect. Cardiac glycosides act on the heart, cyanogenic glycosides release cyanide, and saponins are surface-active.",
  },
  {
    subject: "Pharmacognosy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A herbal product is being standardised. The marker compounds are volatile, aromatic, and responsible for the characteristic odour of the plant; they are typically isolated by hydro-distillation.",
    question: "This class of constituents is best described as:",
    options: ["Tannins", "Volatile (essential) oils", "Fixed oils", "Resins"],
    correctIndex: 1,
    explanation:
      "Volatile (essential) oils are aromatic, odorous constituents traditionally isolated by hydro-distillation. Tannins are non-volatile polyphenols, fixed oils are non-volatile triglycerides, and resins are non-volatile amorphous solids.",
  },
  {
    subject: "Pharmacognosy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which crude drug is the dried latex of unripe capsules of Papaver somniferum?",
    options: ["Opium", "Aloe", "Acacia", "Agar"],
    correctIndex: 0,
    explanation:
      "Opium is the air-dried latex obtained from incised unripe capsules of Papaver somniferum and is the source of morphine and codeine. Aloe is a leaf exudate, acacia a gum, and agar a seaweed polysaccharide.",
  },

  /* ===================== INDUSTRIAL PHARMACY ===================== */
  {
    subject: "Industrial Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "In tablet manufacturing, what is the primary purpose of a disintegrant such as croscarmellose sodium?",
    options: [
      "To bind the powder particles together",
      "To promote tablet breakup and drug release in fluid",
      "To improve powder flow into the die",
      "To prevent sticking to the punches",
    ],
    correctIndex: 1,
    explanation:
      "A disintegrant promotes the breakup of the tablet into smaller fragments when it contacts fluid, aiding dissolution and drug release. Binding is the role of a binder, flow is improved by glidants, and anti-adherence is provided by lubricants/anti-adherents.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Magnesium stearate is most commonly added to a tablet formulation as a:",
    options: ["Binder", "Lubricant", "Disintegrant", "Diluent"],
    correctIndex: 1,
    explanation:
      "Magnesium stearate is a hydrophobic lubricant that reduces friction between the tablet and die wall during ejection. Excess can retard disintegration and dissolution because of its hydrophobic nature.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "During a production run, finished tablets show capping (the top layer separating from the body). Investigation rules out machine speed and points to the granulation.",
    question: "Which formulation-related cause is the most likely explanation?",
    options: [
      "Excess fines and entrapped air causing poor bonding",
      "Too much disintegrant",
      "Excess colourant",
      "Insufficient lubricant",
    ],
    correctIndex: 0,
    explanation:
      "Capping commonly results from air entrapment and poor inter-particle bonding, often due to excess fines, over-drying, or inadequate binder. Disintegrant, colourant and lubricant levels are not the usual root cause of capping.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which validation term describes documented evidence that equipment is installed correctly per the manufacturer's specifications?",
    options: [
      "Design Qualification (DQ)",
      "Installation Qualification (IQ)",
      "Operational Qualification (OQ)",
      "Performance Qualification (PQ)",
    ],
    correctIndex: 1,
    explanation:
      "Installation Qualification (IQ) documents that equipment is received and installed correctly to specification. OQ tests operation across the intended range, PQ confirms performance under production conditions, and DQ addresses design suitability.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A poorly water-soluble drug shows erratic oral bioavailability. The formulation team wants to increase the dissolution rate without changing the dose.",
    question: "Which approach would most directly increase the dissolution rate?",
    options: [
      "Increasing the particle size of the drug",
      "Micronising the drug to increase surface area",
      "Adding a hydrophobic lubricant",
      "Compressing the tablet at higher pressure",
    ],
    correctIndex: 1,
    explanation:
      "By the Noyes–Whitney relationship, dissolution rate rises with surface area, so micronisation (reducing particle size) increases it. Larger particles, hydrophobic lubricants and higher compaction pressure tend to slow dissolution.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "What does GMP stand for in pharmaceutical manufacturing?",
    options: [
      "General Manufacturing Procedure",
      "Good Manufacturing Practice",
      "Guided Material Processing",
      "Global Medicine Protocol",
    ],
    correctIndex: 1,
    explanation:
      "GMP stands for Good Manufacturing Practice, the system ensuring products are consistently produced and controlled to quality standards. It covers premises, equipment, personnel, documentation and process control.",
  },

  /* ===================== PHYSIOLOGY ===================== */
  {
    subject: "Physiology",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which part of the nephron is the primary site of water reabsorption under the influence of ADH?",
    options: ["Proximal convoluted tubule", "Descending loop of Henle", "Collecting duct", "Glomerulus"],
    correctIndex: 2,
    explanation:
      "Antidiuretic hormone (ADH/vasopressin) increases water permeability of the collecting duct by inserting aquaporin-2 channels, concentrating the urine. The proximal tubule reabsorbs water iso-osmotically without ADH control.",
  },
  {
    subject: "Physiology",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "During the cardiac cycle, the first heart sound (S1) is produced by:",
    options: [
      "Closure of the aortic and pulmonary valves",
      "Closure of the mitral and tricuspid valves",
      "Opening of the semilunar valves",
      "Atrial contraction",
    ],
    correctIndex: 1,
    explanation:
      "S1 results from closure of the atrioventricular (mitral and tricuspid) valves at the onset of ventricular systole. S2 is produced by closure of the semilunar (aortic and pulmonary) valves.",
  },
  {
    subject: "Physiology",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A patient hyperventilates during a panic attack, blowing off large amounts of carbon dioxide. An arterial blood gas is taken shortly afterwards.",
    question: "Which acid–base disturbance is expected?",
    options: ["Respiratory acidosis", "Respiratory alkalosis", "Metabolic acidosis", "Metabolic alkalosis"],
    correctIndex: 1,
    explanation:
      "Hyperventilation lowers arterial CO2 (hypocapnia), raising pH and producing a respiratory alkalosis. Respiratory acidosis would follow CO2 retention, while metabolic disturbances are driven by bicarbonate changes.",
  },
  {
    subject: "Physiology",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Insulin lowers blood glucose principally by promoting:",
    options: [
      "Glycogenolysis in the liver",
      "Glucose uptake via GLUT4 in muscle and adipose tissue",
      "Gluconeogenesis",
      "Lipolysis in adipose tissue",
    ],
    correctIndex: 1,
    explanation:
      "Insulin stimulates translocation of GLUT4 transporters to the cell membrane of muscle and adipose tissue, increasing glucose uptake. It inhibits (not promotes) glycogenolysis, gluconeogenesis and lipolysis.",
  },
  {
    subject: "Physiology",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A patient with significant blood loss shows a rapid heart rate and peripheral vasoconstriction as blood pressure falls.",
    question: "Which reflex is primarily responsible for this compensatory response?",
    options: ["Baroreceptor reflex", "Bainbridge reflex", "Chemoreceptor reflex", "Cushing reflex"],
    correctIndex: 0,
    explanation:
      "A fall in arterial pressure reduces baroreceptor firing, triggering reflex sympathetic activation that raises heart rate and causes vasoconstriction. The other reflexes respond to volume, blood gases, or raised intracranial pressure rather than to this acute hypotension.",
  },
  {
    subject: "Physiology",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which blood cells are primarily responsible for oxygen transport?",
    options: ["Leukocytes", "Platelets", "Erythrocytes", "Lymphocytes"],
    correctIndex: 2,
    explanation:
      "Erythrocytes (red blood cells) carry oxygen bound to haemoglobin. Leukocytes and lymphocytes serve immune functions, and platelets are involved in haemostasis.",
  },

  /* ===================== ANATOMY ===================== */
  {
    subject: "Anatomy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "How many lobes does the right lung have?",
    options: ["Two", "Three", "Four", "One"],
    correctIndex: 1,
    explanation:
      "The right lung has three lobes (upper, middle and lower) separated by the horizontal and oblique fissures. The left lung has two lobes to accommodate the heart (cardiac notch).",
  },
  {
    subject: "Anatomy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which cranial nerve is responsible for innervating the muscles of facial expression?",
    options: ["Trigeminal (V)", "Facial (VII)", "Glossopharyngeal (IX)", "Vagus (X)"],
    correctIndex: 1,
    explanation:
      "The facial nerve (CN VII) supplies the muscles of facial expression. The trigeminal nerve supplies the muscles of mastication and facial sensation, while CN IX and X serve the pharynx and viscera.",
  },
  {
    subject: "Anatomy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A patient sustains a mid-shaft fracture of the humerus. After healing, they cannot extend the wrist and fingers, producing a 'wrist drop'.",
    question: "Which nerve was most likely injured?",
    options: ["Median nerve", "Ulnar nerve", "Radial nerve", "Axillary nerve"],
    correctIndex: 2,
    explanation:
      "The radial nerve runs in the radial groove of the humerus and is vulnerable to mid-shaft fractures; it supplies the wrist and finger extensors, so injury causes wrist drop. The median, ulnar and axillary nerves produce different deficits.",
  },
  {
    subject: "Anatomy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "The functional unit of the kidney responsible for filtering blood is the:",
    options: ["Nephron", "Alveolus", "Hepatocyte", "Sarcomere"],
    correctIndex: 0,
    explanation:
      "The nephron is the functional filtering unit of the kidney. The alveolus is the gas-exchange unit of the lung, the hepatocyte the liver cell, and the sarcomere the contractile unit of muscle.",
  },
  {
    subject: "Anatomy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which chamber of the heart pumps oxygenated blood into the systemic circulation?",
    options: ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
    correctIndex: 3,
    explanation:
      "The left ventricle pumps oxygenated blood into the aorta and systemic circulation, hence its thick muscular wall. The right ventricle pumps to the lungs, and the atria are receiving chambers.",
  },
  {
    subject: "Anatomy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A surgeon notes that a structure passes through the inguinal canal in the male. It is being carefully preserved during a hernia repair.",
    question: "Which structure normally traverses the inguinal canal in males?",
    options: ["Round ligament", "Spermatic cord", "Femoral artery", "Ureter"],
    correctIndex: 1,
    explanation:
      "In males the spermatic cord passes through the inguinal canal; in females the round ligament of the uterus does. The femoral artery passes beneath the inguinal ligament, and the ureter lies retroperitoneally.",
  },

  /* ===================== DOSAGE FORM SCIENCE ===================== */
  {
    subject: "Dosage Form Science",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "An emulsion in which oil droplets are dispersed in a continuous water phase is classified as:",
    options: ["Water-in-oil (w/o)", "Oil-in-water (o/w)", "Multiple emulsion", "Microemulsion only"],
    correctIndex: 1,
    explanation:
      "When oil is the dispersed (internal) phase and water is continuous, the emulsion is oil-in-water (o/w). In water-in-oil, water droplets are dispersed in oil; multiple emulsions are more complex systems.",
  },
  {
    subject: "Dosage Form Science",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which suppository base melts at body temperature to release the drug?",
    options: ["Theobroma oil (cocoa butter)", "Sodium chloride", "Microcrystalline cellulose", "Talc"],
    correctIndex: 0,
    explanation:
      "Theobroma oil (cocoa butter) is a classic fatty suppository base that melts at body temperature to release the drug. The other substances are not suppository bases that melt at body temperature.",
  },
  {
    subject: "Dosage Form Science",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A pharmacist must dispense an antibiotic to a 3-year-old who cannot swallow tablets. The drug is unstable in aqueous solution over time, so it is supplied as a dry powder to be made up by adding water.",
    question: "Which dosage form best fits this description?",
    options: [
      "Dry powder for reconstitution into a suspension",
      "Effervescent tablet",
      "Enteric-coated tablet",
      "Sublingual tablet",
    ],
    correctIndex: 0,
    explanation:
      "A drug that is unstable in water and intended for a child is commonly supplied as a dry powder reconstituted into a suspension just before use, extending shelf life. Enteric-coated and sublingual tablets are unsuitable for a young child who cannot swallow solids.",
  },
  {
    subject: "Dosage Form Science",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "What is the main purpose of an enteric coating on a tablet?",
    options: [
      "To mask taste only",
      "To protect the drug from stomach acid and release it in the intestine",
      "To speed up disintegration in the stomach",
      "To make the tablet float on gastric fluid",
    ],
    correctIndex: 1,
    explanation:
      "Enteric coatings resist gastric acid and dissolve at the higher pH of the small intestine, protecting acid-labile drugs or the stomach from irritant drugs. They deliberately delay, rather than speed, release in the stomach.",
  },
  {
    subject: "Dosage Form Science",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A parenteral product intended for intravenous injection is being formulated. The formulator must ensure it does not cause haemolysis or pain on injection due to osmotic effects.",
    question: "The solution should ideally be made:",
    options: ["Strongly hypotonic", "Isotonic with blood", "Strongly hypertonic", "Free of any tonicity adjustment"],
    correctIndex: 1,
    explanation:
      "Intravenous solutions are ideally isotonic with blood (about 0.9% NaCl equivalent) to avoid haemolysis or crenation of red cells and to minimise pain. Hypotonic solutions can lyse cells and markedly hypertonic ones can cause crenation and irritation.",
  },
  {
    subject: "Dosage Form Science",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Which dosage form is designed to deliver a drug across the skin for systemic effect?",
    options: ["Transdermal patch", "Lozenge", "Pessary", "Enema"],
    correctIndex: 0,
    explanation:
      "A transdermal patch delivers drug through the skin into the systemic circulation at a controlled rate. Lozenges act in the mouth/throat, pessaries are vaginal, and enemas are rectal.",
  },

  /* ===================== PHYSICAL PHARMACY ===================== */
  {
    subject: "Physical Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "According to the Henderson–Hasselbalch equation, a weak acid drug will be predominantly un-ionised when:",
    options: [
      "pH is well above its pKa",
      "pH equals its pKa",
      "pH is well below its pKa",
      "It is in a strongly alkaline medium",
    ],
    correctIndex: 2,
    explanation:
      "For a weak acid, lowering the pH below the pKa shifts the equilibrium toward the un-ionised (protonated) form. At pH = pKa the drug is 50% ionised, and above the pKa it becomes increasingly ionised.",
  },
  {
    subject: "Physical Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "The Noyes–Whitney equation describes the rate of:",
    options: ["Drug degradation", "Drug dissolution", "Drug absorption across membranes", "Protein binding"],
    correctIndex: 1,
    explanation:
      "The Noyes–Whitney equation relates dissolution rate to surface area, the diffusion coefficient, and the concentration gradient across the diffusion layer. It is a foundational model for dissolution, not degradation or membrane transport.",
  },
  {
    subject: "Physical Pharmacy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A liquid pharmaceutical follows first-order degradation kinetics. Stability testing shows it loses potency at a rate proportional to the concentration of remaining drug.",
    question: "Which statement about its degradation is correct?",
    options: [
      "The half-life is independent of the initial concentration",
      "The half-life increases as concentration falls",
      "A plot of concentration versus time is linear",
      "The rate is constant regardless of concentration",
    ],
    correctIndex: 0,
    explanation:
      "For first-order kinetics the half-life is constant and independent of the initial concentration, and a plot of log concentration versus time is linear. A constant rate independent of concentration describes zero-order kinetics instead.",
  },
  {
    subject: "Physical Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Surfactants reduce the interfacial tension between two phases primarily because they are:",
    options: [
      "Entirely hydrophilic",
      "Entirely lipophilic",
      "Amphiphilic (have both polar and non-polar regions)",
      "Electrically neutral salts",
    ],
    correctIndex: 2,
    explanation:
      "Surfactants are amphiphilic, with a hydrophilic head and a lipophilic tail, so they accumulate at interfaces and lower interfacial tension. This property underpins their use as emulsifiers, wetting agents and solubilisers.",
  },
  {
    subject: "Physical Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A formulator must choose a surfactant to prepare a stable oil-in-water emulsion and consults HLB values.",
    question: "Which approximate HLB range is most appropriate for an oil-in-water emulsifier?",
    options: ["1–3", "3–6", "8–18", "Below 1"],
    correctIndex: 2,
    explanation:
      "Surfactants with a higher HLB (roughly 8–18) are more hydrophilic and favour oil-in-water emulsions. Low HLB values (3–6) favour water-in-oil emulsions, and very low values suit antifoaming.",
  },
  {
    subject: "Physical Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Buffer capacity of a buffer solution is greatest when:",
    options: [
      "The pH is far from the pKa",
      "The pH equals the pKa of the buffer",
      "Only the acid form is present",
      "Only the salt form is present",
    ],
    correctIndex: 1,
    explanation:
      "A buffer resists pH change most effectively when pH equals the pKa, where the concentrations of the acid and conjugate base are equal. Capacity falls as the pH moves away from the pKa.",
  },

  /* ===================== COMMUNITY PHARMACY ===================== */
  {
    subject: "Community Pharmacy",
    style: "scenario",
    difficulty: "Easy",
    scenario:
      "A mother asks for advice for her 5-year-old who has a fever and mild discomfort from a cold. She wants an over-the-counter option and mentions the child is otherwise healthy.",
    question: "Which is the most appropriate first-line OTC recommendation?",
    options: [
      "Aspirin",
      "Paracetamol at an age-appropriate dose",
      "Codeine linctus",
      "An oral decongestant for under-6s",
    ],
    correctIndex: 1,
    explanation:
      "Weight/age-appropriate paracetamol is a suitable first-line antipyretic and analgesic for a young child. Aspirin is avoided in children due to Reye's syndrome risk, codeine is contraindicated in young children, and OTC decongestants are not recommended in under-6s.",
  },
  {
    subject: "Community Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A patient presents to the pharmacy requesting an OTC remedy for persistent cough lasting more than three weeks, with associated weight loss and night sweats.",
    question: "What is the most appropriate action?",
    options: [
      "Sell a strong cough suppressant",
      "Refer the patient to their doctor",
      "Recommend a higher-dose antihistamine",
      "Advise steam inhalation only",
    ],
    correctIndex: 1,
    explanation:
      "A cough persisting beyond about three weeks with red-flag features such as weight loss and night sweats warrants medical referral to exclude serious causes. Selling an OTC suppressant would inappropriately delay diagnosis.",
  },
  {
    subject: "Community Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "The 'five rights' of medication administration include all of the following EXCEPT:",
    options: ["Right patient", "Right drug", "Right price", "Right dose"],
    correctIndex: 2,
    explanation:
      "The classic five rights are right patient, right drug, right dose, right route and right time. Price is a commercial consideration, not part of the safety checks.",
  },
  {
    subject: "Community Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A regular patient on warfarin comes in to buy ibuprofen for back pain, saying paracetamol 'isn't strong enough'.",
    question: "What is the key counselling concern?",
    options: [
      "Ibuprofen has no interaction with warfarin",
      "NSAIDs increase bleeding risk and GI irritation with warfarin",
      "Ibuprofen reduces warfarin's effect, risking clots",
      "There is no concern; sell as requested",
    ],
    correctIndex: 1,
    explanation:
      "NSAIDs such as ibuprofen increase bleeding risk in warfarin patients through antiplatelet effects and GI irritation, and may also affect INR. The pharmacist should counsel against it and suggest safer analgesia or referral.",
  },
  {
    subject: "Community Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which counselling point is essential when dispensing oral isotretinoin to a woman of childbearing potential?",
    options: [
      "Take it on an empty stomach for best absorption",
      "It is a potent teratogen; effective contraception is required",
      "It commonly causes weight gain",
      "It must be taken at night only",
    ],
    correctIndex: 1,
    explanation:
      "Isotretinoin is a potent teratogen, so reliable contraception and pregnancy prevention measures are mandatory for women of childbearing potential. Counselling on this risk is the most critical safety point.",
  },
  {
    subject: "Community Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Oral rehydration salts (ORS) are primarily used in the community management of:",
    options: ["Constipation", "Acute diarrhoea and dehydration", "Hypertension", "Insomnia"],
    correctIndex: 1,
    explanation:
      "ORS replaces fluid and electrolytes lost in acute diarrhoea and is a cornerstone of preventing and treating dehydration, especially in children. It plays no therapeutic role in the other conditions listed.",
  },

  /* ===================== CLINICAL PHARMACY ===================== */
  {
    subject: "Clinical Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A 62-year-old man started on an ACE inhibitor for hypertension returns complaining of a persistent, dry, tickly cough that disturbs his sleep. His blood pressure is well controlled and other observations are normal.",
    question: "What is the most appropriate management?",
    options: [
      "Add a cough suppressant and continue the ACE inhibitor",
      "Switch the ACE inhibitor to an angiotensin receptor blocker (ARB)",
      "Stop all antihypertensives",
      "Double the ACE inhibitor dose",
    ],
    correctIndex: 1,
    explanation:
      "A persistent dry cough is a well-known class effect of ACE inhibitors caused by bradykinin accumulation; switching to an ARB usually resolves it while maintaining blood pressure control. Suppressing the cough or increasing the dose does not address the cause.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A 75-year-old woman on digoxin for heart failure is admitted with nausea, visual disturbances (yellow-green halos) and a slow, irregular pulse. She was recently started on a diuretic.",
    question: "Which electrolyte abnormality most likely precipitated digoxin toxicity?",
    options: ["Hyperkalaemia", "Hypokalaemia", "Hypernatraemia", "Hypercalcaemia"],
    correctIndex: 1,
    explanation:
      "Hypokalaemia, often caused by loop or thiazide diuretics, potentiates digoxin binding to the Na+/K+ ATPase and precipitates toxicity. The visual disturbances and bradyarrhythmia are classic features of digoxin toxicity.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which laboratory parameter is most important to monitor in a patient taking long-term lithium?",
    options: [
      "Liver enzymes only",
      "Serum lithium level and renal/thyroid function",
      "Blood glucose only",
      "Serum amylase",
    ],
    correctIndex: 1,
    explanation:
      "Lithium has a narrow therapeutic index and is renally cleared, so serum lithium levels plus renal and thyroid function must be monitored regularly. Toxicity risk rises with dehydration, renal impairment and certain drug interactions.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A patient newly started on simvastatin reports unexplained muscle pain and weakness. Bloods show a markedly raised creatine kinase.",
    question: "Which adverse effect should be suspected?",
    options: ["Hepatitis", "Myopathy/rhabdomyolysis", "Pancreatitis", "Nephritis"],
    correctIndex: 1,
    explanation:
      "Statins can cause myopathy that may progress to rhabdomyolysis, indicated by muscle pain/weakness and a markedly raised creatine kinase. The statin should be stopped and renal function and CK monitored.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which counselling advice is correct for a patient taking oral alendronate for osteoporosis?",
    options: [
      "Take it at bedtime with food",
      "Take it with a full glass of water and remain upright for at least 30 minutes",
      "Take it with milk to aid absorption",
      "Crush and dissolve in juice before taking",
    ],
    correctIndex: 1,
    explanation:
      "Oral bisphosphonates such as alendronate should be taken on an empty stomach with a full glass of plain water, and the patient should stay upright for at least 30 minutes to reduce oesophageal irritation. Food, milk and other drinks markedly reduce absorption.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "scenario",
    difficulty: "Hard",
    scenario:
      "A patient on a serotonergic antidepressant is given tramadol for pain. Days later they develop agitation, fever, sweating, tremor, hyperreflexia and clonus.",
    question: "Which adverse drug reaction is most likely?",
    options: ["Neuroleptic malignant syndrome", "Serotonin syndrome", "Malignant hyperthermia", "Anticholinergic toxicity"],
    correctIndex: 1,
    explanation:
      "The combination of a serotonergic antidepressant and tramadol can precipitate serotonin syndrome, characterised by autonomic instability, neuromuscular hyperactivity (clonus, hyperreflexia) and altered mental state. Management is stopping the offending agents and supportive care.",
  },
  {
    subject: "Clinical Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "What is the specific reversal agent (antidote) for a warfarin overdose with major bleeding?",
    options: ["Protamine sulphate", "Vitamin K (phytomenadione) ± prothrombin complex", "Flumazenil", "N-acetylcysteine"],
    correctIndex: 1,
    explanation:
      "Vitamin K (phytomenadione), usually with prothrombin complex concentrate in major bleeding, reverses warfarin's effect on clotting factor synthesis. Protamine reverses heparin, flumazenil reverses benzodiazepines, and N-acetylcysteine treats paracetamol overdose.",
  },

  /* ===================== ADDITIONAL MIXED ITEMS ===================== */
  {
    subject: "Pharmacology",
    style: "simple",
    difficulty: "Hard",
    scenario: "",
    question: "Which drug is a non-selective beta-blocker that should be used with caution in asthma?",
    options: ["Atenolol", "Bisoprolol", "Propranolol", "Metoprolol"],
    correctIndex: 2,
    explanation:
      "Propranolol is non-selective, blocking both beta-1 and beta-2 receptors; beta-2 blockade can provoke bronchoconstriction in asthma. Atenolol, bisoprolol and metoprolol are relatively beta-1 selective (cardioselective).",
  },
  {
    subject: "Physiology",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "An athlete trains at high altitude for several weeks. On return, blood tests show an increased red blood cell count.",
    question: "Which hormone is primarily responsible for this adaptation?",
    options: ["Erythropoietin", "Thyroxine", "Cortisol", "Aldosterone"],
    correctIndex: 0,
    explanation:
      "Low oxygen at altitude stimulates the kidneys to release erythropoietin, which increases red blood cell production to improve oxygen-carrying capacity. The other hormones do not directly drive erythropoiesis.",
  },
  {
    subject: "Anatomy",
    style: "simple",
    difficulty: "Moderate",
    scenario: "",
    question: "Which structure connects the stomach to the small intestine?",
    options: ["Pylorus", "Cardia", "Ileocaecal valve", "Oesophagus"],
    correctIndex: 0,
    explanation:
      "The pylorus, with the pyloric sphincter, connects the stomach to the duodenum (the first part of the small intestine). The cardia is the stomach's oesophageal junction and the ileocaecal valve joins the small and large intestines.",
  },
  {
    subject: "Pharmacognosy",
    style: "simple",
    difficulty: "Hard",
    scenario: "",
    question: "Vincristine and vinblastine, used in cancer chemotherapy, are alkaloids obtained from:",
    options: ["Catharanthus roseus", "Taxus baccata", "Podophyllum peltatum", "Colchicum autumnale"],
    correctIndex: 0,
    explanation:
      "The vinca alkaloids vincristine and vinblastine are isolated from Catharanthus roseus (Madagascar periwinkle). Taxus yields taxanes, Podophyllum yields podophyllotoxin, and Colchicum yields colchicine.",
  },
  {
    subject: "Physical Pharmacy",
    style: "simple",
    difficulty: "Easy",
    scenario: "",
    question: "Partition coefficient (log P) is a measure of a drug's:",
    options: [
      "Relative solubility between oil and water phases",
      "Rate of degradation",
      "Particle size distribution",
      "Melting point",
    ],
    correctIndex: 0,
    explanation:
      "The partition coefficient (log P) expresses how a drug distributes between a lipid (e.g. octanol) and an aqueous phase, indicating its lipophilicity. It strongly influences membrane permeation and absorption.",
  },
  {
    subject: "Industrial Pharmacy",
    style: "scenario",
    difficulty: "Moderate",
    scenario:
      "A quality control analyst tests a batch of tablets and finds that several fail the weight-uniformity test, with weights varying widely.",
    question: "Which granulation property is the most likely root cause?",
    options: [
      "Poor powder flow into the die",
      "Excess colourant",
      "Too high a disintegrant level",
      "Use of a film coating",
    ],
    correctIndex: 0,
    explanation:
      "Inconsistent die filling from poor powder flow is a leading cause of weight variation in tablets. Improving flow (e.g. with glidants or better granulation) typically resolves it; colourant, disintegrant level and coating are not usual causes.",
  },
];
