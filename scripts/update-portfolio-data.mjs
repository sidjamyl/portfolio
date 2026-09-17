import { DatabaseSync } from "node:sqlite"

const db = new DatabaseSync(new URL("../menu.db", import.meta.url).pathname)

if (!process.argv.includes("--apply")) {
  const projects = db.prepare("SELECT section, \"order\", description FROM projects").all()
  const categories = db.prepare("SELECT \"order\" FROM categories").all()
  const jobs = db.prepare("SELECT period FROM jobs").all()
  if (projects.length !== 10 || projects.some((row) => !row.section || !row.order || !/^(Built|Enabled|Created|Won|Recreated|Implemented|Made|Automated) /.test(row.description)) || categories.some((row) => !row.order) || jobs.some((row) => !row.period)) {
    throw new Error("Portfolio content or ordering is incomplete.")
  }
  console.log("Payload portfolio content and ordering are valid.")
  db.close()
  process.exit(0)
}

function column(table, name, definition) {
  if (!db.prepare(`PRAGMA table_info(${table})`).all().some((field) => field.name === name)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN "${name}" ${definition}`)
  }
}

db.exec("BEGIN")
try {
  column("projects", "section", "TEXT DEFAULT 'projects'")
  column("projects", "order", "NUMERIC DEFAULT 0")
  column("projects", "tags", "TEXT")
  column("projects", "highlights", "TEXT")
  column("jobs", "period", "TEXT")
  column("stacks", "order", "NUMERIC DEFAULT 0")
  column("categories", "order", "NUMERIC DEFAULT 0")

  const projects = [
    [1, "ESI-MAINT", "Built a single maintenance workflow by designing equipment tracking, intervention management, and an AI assistant for ESI teams.", "Web and AI platform", "Next.js, NestJS, AI, Workflow design", "Equipment tracking;Intervention workflow;AI assistant", "projects", 1],
    [2, "GIG Training Platform", "Enabled GIG Assurance to manage employee training in one place by mapping business needs and building the scheduling, progress, and administration workflows.", "Internal training platform", "Next.js, Full-stack, Business analysis, Dashboard", "Training schedules;Staff progress;Administrative workflow", "clients", 1],
    [3, "Khatt Production", "Created a clear online showcase for Khatt Production by building a responsive website that presents its video work and creative identity.", "Creative agency website", "Web design, Responsive UI, Landing page", "Video portfolio;Agency identity;Responsive website", "clients", 3],
    [4, "SolidaryPay", "Won first place at Djezzy Code Fest by building a donation platform that connects donors with socially responsible companies through prepaid credit.", "Hackathon-winning donation platform", "Web app, Product design, Teamwork, Payments", "1st place;Donation flow;Corporate partners", "projects", 2],
    [5, "Terminal UNO", "Recreated UNO as a playable terminal game by implementing an ASCII interface, stacks for decks, queues for turns, and doubly linked lists for player hands in C.", "Card game in C", "C, Data structures, CLI, Algorithms", "ASCII interface;Turn queue;Dynamic hands", "projects", 6],
    [6, "Tree Traversal Algorithms", "Implemented recursive and iterative tree traversal by working directly with pointers, memory, and data structures in ESI's Z language.", "Data structures and algorithms", "Z, Algorithms, Pointers, Recursion", "Recursive traversal;Iterative traversal;Memory handling", "projects", 7],
    [7, "Algerian Student IQ Test", "Made logic puzzles accessible to Algerian students by building an interactive, gamified IQ test with the ETIC Club.", "Interactive student web app", "Web app, Gamification, UI, ETIC", "Logic puzzles;Interactive test;Student audience", "projects", 5],
    [8, "Joumla Store", "Enabled wholesale customers to browse products, order by the case, and follow deliveries by building a mobile commerce app with product, stock, order, client, and payment administration.", "Wholesale commerce app", "Mobile, E-commerce, Admin dashboard, Inventory", "Bulk ordering;Delivery tracking;Stock management", "clients", 2],
    [9, "Refactoring Swarm", "Automated Python code refactoring and fixes by orchestrating multiple agents with LangChain, LangGraph, and the Mistral AI API.", "Multi-agent developer tool", "Python, LangChain, LangGraph, Mistral AI", "Code refactoring;Automated fixes;Multi-agent flow", "projects", 4],
    [10, "Global Cluster RFID", "Enabled RFID and barcode scanning on Android by connecting a mobile app to compatible readers and handling both scan workflows.", "Android scanning app", "Android, RFID, Barcode scanning, Mobile", "RFID reading;Barcode reading;Reader integration", "projects", 3],
  ]
  const updateProject = db.prepare("UPDATE projects SET title=?, description=?, type=?, tags=?, highlights=?, section=?, \"order\"=?, updated_at=? WHERE id=?")
  for (const [id, title, description, type, tags, highlights, section, order] of projects) {
    updateProject.run(title, description, type, tags, highlights, section, order, new Date().toISOString(), id)
  }
  db.exec("UPDATE projects SET code_link = NULL WHERE id IN (1, 2, 4, 5, 6, 7)")

  const jobs = [
    [1, "Full-Stack Developer | IB Software", "Delivered custom web platforms for professional clients by contributing to business analysis, frontend, backend, and deployment.\nBuilt GIG Assurance's training workflows by translating operational needs into a full-stack internal product.", "AUG 2025 → PRESENT", 1],
    [2, "Web Developer & Coordinator | ETIC", "Coordinated more than 120 people for ESI's employment fair by organizing teams, communication, logistics, and partner relationships.\nLed a 100-member multimedia team and managed communication for a club audience of 15,000 followers.", "2024 → PRESENT", 3],
    [3, "Freelance Full-Stack Developer", "Delivered web and mobile products for clients by handling requirements, design, development, and deployment.\nBuilt commerce, real estate, and showcase experiences for Joumla Store, Myroom, Khatt Production, and IB Software.", "MAY 2024 → PRESENT", 2],
  ]
  const updateJob = db.prepare("UPDATE jobs SET position=?, description=?, period=?, \"order\"=?, updated_at=? WHERE id=?")
  for (const [id, position, description, period, order] of jobs) {
    updateJob.run(position, description, period, order, new Date().toISOString(), id)
  }

  const categoryRows = [
    [2, "Frontend", 1], [3, "Design", 2], [1, "Backend", 3],
    [6, "AI & Data", 4], [4, "Tools", 5], [5, "Systems", 6],
  ]
  const updateCategory = db.prepare("UPDATE categories SET name=?, \"order\"=? WHERE id=?")
  for (const [id, name, order] of categoryRows) updateCategory.run(name, order, id)

  const stackRows = [
    [11, "React", 1], [5, "Next.js", 2], [9, "TypeScript", 3], [6, "Tailwind CSS", 4],
    [3, "JavaScript", 5], [4, "CSS", 6], [8, "Vite", 7], [10, "Vercel", 8],
    [1, "Figma", 1], [2, "Adobe Illustrator", 2], [17, "Canva", 3],
    [12, "Node.js", 1], [20, "NestJS", 2], [14, "Express", 3], [15, "REST APIs", 4],
    [19, "MySQL", 5], [13, "Docker", 6], [16, "NGINX", 7],
    [7, "Python", 1], [22, "Git", 1], [23, "GitHub", 2],
    [18, "Linux", 1], [21, "Assembly", 2],
  ]
  const updateStack = db.prepare("UPDATE stacks SET name=?, \"order\"=? WHERE id=?")
  for (const [id, name, order] of stackRows) updateStack.run(name, order, id)

  const bad = db.prepare("SELECT id FROM projects WHERE description NOT LIKE 'Built %' AND description NOT LIKE 'Enabled %' AND description NOT LIKE 'Created %' AND description NOT LIKE 'Won %' AND description NOT LIKE 'Recreated %' AND description NOT LIKE 'Implemented %' AND description NOT LIKE 'Made %' AND description NOT LIKE 'Automated %'").all()
  if (bad.length) throw new Error(`Projects without outcome-first descriptions: ${bad.map((row) => row.id).join(", ")}`)
  db.exec("COMMIT")
  console.log("Updated and checked Payload portfolio content.")
} catch (error) {
  db.exec("ROLLBACK")
  throw error
} finally {
  db.close()
}
