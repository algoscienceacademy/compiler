// Initialize global variable first
let currentLanguage = 'python';

// Initialize Ace Editor
const editor = ace.edit("editor");
editor.setTheme("ace/theme/dracula");
editor.setShowPrintMargin(false);
editor.setOptions({
    enableBasicAutocompletion: true,
    enableSnippets: true,
    enableLiveAutocompletion: true,
    fontSize: "14px",
    tabSize: 4,
    showGutter: true,
    wrap: true,
    highlightActiveLine: true,
    showLineNumbers: true,
    displayIndentGuides: true
});

// Language Metadata with proper Hello World examples
const LANGUAGE_DATA = {
    python: {
        name: "Python",
        mode: "python",
        version: "3.10.0",
        template: 'name = input("Enter your name: ")\nprint(f"Hello, {name}!")',
        ext: ".py",
        category: "popular"
    },
    python2: {
        name: "Python 2",
        mode: "python",
        version: "2.7.18",
        template: 'print "Hello, World!"',
        ext: ".py",
        category: "scripting"
    },
    javascript: {
        name: "JavaScript",
        mode: "javascript",
        version: "18.15.0",  // Updated to latest supported Node.js version
        template: 'const readline = require("readline").createInterface({\n' +
                 '    input: process.stdin,\n' +
                 '    output: process.stdout\n' +
                 '});\n\n' +
                 'readline.question("Enter your name: ", name => {\n' +
                 '    console.log(`Hello, ${name}!`);\n' +
                 '    readline.close();\n' +
                 '});',
        ext: ".js",
        category: "web"
    },
    java: {
        name: "Java",
        mode: "java",
        version: "15.0.2",
        template: 'import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        System.out.print("Enter your name: ");\n        String name = scanner.nextLine();\n        System.out.println("Hello, " + name + "!");\n    }\n}',
        ext: ".java",
        category: "popular"
    },
    cpp: {
        name: "C++",
        mode: "c_cpp",
        version: "10.2.0",
        template: '#include <iostream>\n#include <string>\n\nint main() {\n    std::string name;\n    std::cout << "Enter your name: ";\n    std::getline(std::cin, name);\n    std::cout << "Hello, " << name << "!" << std::endl;\n    return 0;\n}',
        ext: ".cpp",
        category: "systems"
    },
    c: {
        name: "C",
        mode: "c_cpp",
        version: "10.2.0",
        template: '#include <stdio.h>\n\nint main() {\n    char name[100];\n    printf("Enter your name: ");\n    fgets(name, sizeof(name), stdin);\n    printf("Hello, %s!", name);\n    return 0;\n}',
        ext: ".c",
        category: "systems"
    },
    ruby: {
        name: "Ruby",
        mode: "ruby",
        version: "3.0.0",  // Updated to Piston-supported version
        template: 'print "Enter your name: "\nname = gets.chomp\nputs "Hello, #{name}!"',
        ext: ".rb",
        category: "scripting"
    },
    go: {
        name: "Go",
        mode: "golang",
        version: "1.16.2",
        template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Print("Enter your name: ")\n    var name string\n    fmt.Scanln(&name)\n    fmt.Printf("Hello, %s!\\n", name)\n}',
        ext: ".go",
        category: "systems"
    },
    rust: {
        name: "Rust",
        mode: "rust",
        version: "1.68.2",
        template: 'use std::io::{self, Write};\n\nfn main() {\n    print!("Enter your name: ");\n    io::stdout().flush().unwrap();\n    let mut name = String::new();\n    io::stdin().read_line(&mut name).unwrap();\n    println!("Hello, {}!", name.trim());\n}',
        ext: ".rs",
        category: "systems"
    },
    php: {
        name: "PHP",
        mode: "php",
        version: "8.0.3",  // Updated to Piston-supported version
        template: '<?php\n' +
                 'function readLine() {\n' +
                 '    return rtrim(fgets(STDIN));\n' +
                 '}\n\n' +
                 'echo "Enter your name: ";\n' +
                 '$name = readLine();\n' +
                 'echo "Hello, " . $name . "!\\n";',
        ext: ".php",
        category: "web"
    },
    swift: {
        name: "Swift",
        mode: "swift",
        version: "5.3.3",  // Updated version
        template: 'if let name = readLine() {\n    print("Hello, \\(name)!")\n}',
        ext: ".swift",
        category: "modern"
    },
    kotlin: {
        name: "Kotlin",
        mode: "kotlin",
        version: "1.8.20",
        template: 'fun main() {\n    println("Hello, World!")\n}',
        ext: ".kt",
        category: "modern"
    },
    haskell: {
        name: "Haskell",
        mode: "haskell",
        version: "9.4.5",
        template: 'main :: IO ()\nmain = do\n    putStr "Enter your name: "\n    name <- getLine\n    putStrLn $ "Hello, " ++ name ++ "!"',
        ext: ".hs",
        category: "functional"
    },
    perl: {
        name: "Perl",
        mode: "perl",
        version: "5.36.0",
        template: 'print "Hello, World!\\n";',
        ext: ".pl",
        category: "scripting"
    },
    lua: {
        name: "Lua",
        mode: "lua",
        version: "5.4.4",
        template: 'print("Hello, World!")',
        ext: ".lua",
        category: "scripting"
    },
    dart: {
        name: "Dart",
        mode: "dart",
        version: "2.15.1",  // Updated version
        template: 'import "dart:io";\n\nvoid main() {\n    stdout.write("Enter your name: ");\n    String? name = stdin.readLineSync();\n    print("Hello, $name!");\n}',
        ext: ".dart",
        category: "modern"
    },
    // Esoteric Languages
    brainfuck: {
        name: "Brainfuck",
        mode: "text",
        version: "2.7.3",
        template: '++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.',
        ext: ".bf",
        category: "esoteric"
    },
    // Academic Languages
    pascal: {
        name: "Pascal",
        mode: "pascal",
        version: "3.2.2",
        template: 'program HelloWorld;\nbegin\n    writeln(\'Hello, World!\');\nend.',
        ext: ".pas",
        category: "academic"
    },
    fortran: {
        name: "Fortran",
        mode: "fortran",
        version: "11.0",
        template: 'program hello\n    print *, "Hello, World!"\nend program hello',
        ext: ".f90",
        category: "academic"
    },
    // Scientific Languages
    r: {
        name: "R",
        mode: "r",
        version: "4.2.3",
        template: 'cat("Hello, World!\\n")',
        ext: ".r",
        category: "scientific"
    },
    julia: {
        name: "Julia",
        mode: "julia",
        version: "1.8.5",
        template: 'println("Hello, World!")',
        ext: ".jl",
        category: "scientific"
    },
    csharp: {
        name: "C#",
        mode: "csharp",
        version: "6.12.0",  // Mono version supported by Piston
        template: 'using System;\n\n' +
                 'class Program\n{\n' +
                 '    static void Main()\n' +
                 '    {\n' +
                 '        Console.Write("Enter your name: ");\n' +
                 '        string name = Console.ReadLine();\n' +
                 '        Console.WriteLine($"Hello, {name}!");\n' +
                 '    }\n}',
        ext: ".cs",
        category: "popular"
    }
};

// Update categories structure with all languages
const CATEGORIES = {
    popular: {
        name: "Popular Languages",
        languages: ["python", "javascript", "java", "csharp", "cpp", "c", "php", "ruby", "go"]  // Added "c"
    },
    systems: {
        name: "Systems Programming",
        languages: ["c", "cpp", "rust", "go", "nasm", "zig"]
    },
    web: {
        name: "Web Development",
        languages: ["javascript", "typescript", "php", "ruby", "python"]
    },
    scripting: {
        name: "Scripting Languages",
        languages: ["python", "ruby", "perl", "lua", "bash", "powershell"]
    },
    modern: {
        name: "Modern Languages",
        languages: ["kotlin", "swift", "dart", "rust", "go"]
    },
    functional: {
        name: "Functional Languages",
        languages: ["haskell", "scala", "elixir", "ocaml", "clojure"]
    },
    academic: {
        name: "Academic",
        languages: ["pascal", "fortran", "cobol", "basic", "prolog"]
    },
    scientific: {
        name: "Scientific Computing",
        languages: ["r", "julia", "octave", "matlab", "fortran"]
    },
    esoteric: {
        name: "Esoteric Languages",
        languages: ["brainfuck", "befunge93", "cow"]
    }
};

// Enhanced execution handler with better I/O handling
class CodeExecutor {
    constructor() {
        this.apiUrl = 'https://emkc.org/api/v2/piston/execute';
    }

    async execute(code, language) {
        const config = LANGUAGE_DATA[language];
        if (!config) throw new Error(`Language ${language} not supported`);

        console.log(`Executing ${language} version ${config.version}`); // Debug log
        const input = document.getElementById('input').value;
        
        try {
            const requestBody = {
                language,
                version: config.version,
                files: [{
                    name: `main${config.ext}`,
                    content: code.trim()
                }],
                stdin: input,
                compile_timeout: 10000,
                run_timeout: 5000
            };

            console.log('Request:', requestBody);
            
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();
            console.log('API Response:', data);
            return this.formatOutput(data, input);
        } catch (error) {
            console.error('Execution error:', error);
            throw new Error(`Execution failed: ${error.message}`);
        }
    }

    formatOutput(data, input) {
        if (!data.run) return data;
        
        return {
            ...data,
            run: {
                ...data.run,
                input: input,
                stdout: data.run.stdout?.trim() || '',
                stderr: data.run.stderr?.trim() || ''
            }
        };
    }
}

// UI Manager
class UIManager {
    constructor() {
        this.executor = new CodeExecutor();
        this.currentLanguage = currentLanguage; // Store reference to global
        this.setupEventListeners();
        this.initializeSelectors();
    }

    setupEventListeners() {
        document.getElementById('runBtn').onclick = () => this.runCode();
        document.getElementById('categorySelect').onchange = (e) => this.loadCategory(e.target.value);
        document.getElementById('themeSelect')?.addEventListener('change', (e) => {
            editor.setTheme(`ace/theme/${e.target.value}`);
        });
    }

    initializeSelectors() {
        // Initialize category selector
        const categorySelect = document.getElementById('categorySelect');
        categorySelect.innerHTML = Object.entries(CATEGORIES)
            .map(([value, cat]) => `<option value="${value}">${cat.name}</option>`)
            .join('');

        // Initialize theme selector
        const themeSelect = document.getElementById('themeSelect');
        const themes = ["dracula", "monokai", "github_dark", "tomorrow_night", "solarized_dark"];
        themeSelect.innerHTML = themes
            .map(theme => `<option value="${theme}">${theme.replace(/_/g, ' ').toUpperCase()}</option>`)
            .join('');

        // Load initial category
        this.loadCategory('popular');
    }

    loadCategory(category) {
        const languageTabs = document.querySelector('.language-tabs');
        languageTabs.innerHTML = '';
        
        if (CATEGORIES[category] && CATEGORIES[category].languages) {
            CATEGORIES[category].languages.forEach(lang => {
                const config = LANGUAGE_DATA[lang];
                if (config) {
                    const tab = document.createElement('div');
                    tab.className = 'tab';
                    tab.dataset.language = lang;
                    tab.textContent = config.name;
                    tab.onclick = () => this.selectLanguage(lang);
                    languageTabs.appendChild(tab);
                }
            });

            // Select first language in category
            if (CATEGORIES[category].languages.length > 0) {
                this.selectLanguage(CATEGORIES[category].languages[0]);
            }
        }
    }

    selectLanguage(language) {
        const config = LANGUAGE_DATA[language];
        if (!config) return;

        // Update tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.language === language);
        });

        // Update editor mode and content
        editor.session.setMode(`ace/mode/${config.mode}`);
        editor.setValue(config.template || '');
        editor.clearSelection();
        
        // Update current language - both instance and global
        this.currentLanguage = language;
        currentLanguage = language;

        // Clear output
        document.getElementById('output').innerHTML = '';
        document.getElementById('input').value = '';
    }

    async runCode() {
        const output = document.getElementById('output');
        const code = editor.getValue();
        
        if (!code.trim()) {
            output.innerHTML = '<pre class="execution-result error">Error: No code to execute</pre>';
            return;
        }

        output.innerHTML = '<div class="loading">Executing code...</div>';

        try {
            const result = await this.executor.execute(code, this.currentLanguage);
            if (result.run) {
                const stdout = result.run.stdout?.trim() || '';
                const stderr = result.run.stderr?.trim() || '';
                
                output.innerHTML = `
                    <pre class="execution-result ${stderr ? 'error' : 'success'}">
                        ${stderr ? `Error:\n${stderr}\n\nOutput:\n${stdout}` : stdout || 'No output'}
                    </pre>
                `;
            } else {
                throw new Error(result.message || 'Execution failed');
            }
        } catch (error) {
            output.innerHTML = `
                <pre class="execution-result error">
                    Error: ${error.message}
                </pre>
            `;
            console.error('Execution error:', error);
        }
    }
}

// Update keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'enter') {
        e.preventDefault();
        ui.runCode();
    }
});

// Initialize with default category and language
const ui = new UIManager();
