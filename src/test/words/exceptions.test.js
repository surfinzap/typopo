import assert from "assert";
import { excludeExceptions } from "../../lib/words/exceptions";
import Locale from "../../locale/locale";

// Mock locale for URL pattern
const locale = new Locale("en-us");

const emails = [
  "john.doe@example.com",
  "jane_doe123@example.co.uk",
  "user.name+tag+sorting@example.com",
  "customer_service@sub.example.com",
  "no-reply@company.travel",
  "support@helpdesk.example.org",
  "admin@mailserver1.example.museum",
  "contact@company.example",
  "someone@host.com",
  "devs+info@example.com",
  "marketing@business.biz",
  "sales@company.jobs",
  "feedback@website.co.in",
  "info@example.aero",
  "newsletter@media.company",
  "user@subdomain.example.edu",
  "hr@recruitment.example",
  "legal@lawfirm.example",
  "inquiry@inbox.example.us",
  "webmaster@company.com",
  "service@example.co.in",
  "owner@domain.com",
  "registrar@domain.biz",
  "client@example.tel",
  "admin@127.0.0.1",
  "postmaster@example.net",
  "alerts@sub.example.info",
  "user1@example.com",
  "firstname.lastname@example.com",
  "anonymous@company.qa",
  "firstname+lastname@domain.name",
  "bot123@host.mobi",
  "events@community.travel",
  "staff@support.example",
  "qa@example.test",
  "notifications@example.org",
  "abuse@provider.com",
  "info@charity.co",
  "order@example.shop",
  "management@corporate.us",
  "user-service@domain.pro",
  "admin@domain.tel",
  "system@example.global",
  "user.name@organization.ai",
  "developer@example.code",
  "dev@example.dev",
  "owner@platform.biz",
  "contact@api.net",
  "sales@website.co",
  "test.account@domain.com",
  "billing@company.travel"
];

const urls = [
  "http://example.com",
  "https://example.com",
  "http://www.example.com",
  "https://subdomain.example.co.uk",
  "https://example.com:8080/path/to/resource",
  "https://example.com/#fragment",
  "https://192.168.1.1",
  "https://www.example.com/path/to/resource?query=string#fragment",
  "https://example.com/long/path/with/many/segments",
  "http://example.co.in",
  "http://example.travel",
  "http://example.travel:80",
  "https://127.0.0.1",
  "http://255.255.255.255",
  "https://example.museum",
  "http://sub.domain.example.com",
  "https://shop.example.com",
  "http://example.org/resource",
  "https://example.biz",
  "http://example.jobs",
  "https://www.example.edu",
  "http://subdomain.example.mobi",
  "https://example.info/resource?param=value",
  "http://123.45.67.89:8080",
  "http://example.com/~user",
  "http://example.com:3000/path/to/resource",
  "http://sub.example.com/resource?query=string",
  "https://shop.example.travel",
  "https://media.example.co.uk",
  "https://intranet.example.org",
  "http://api.example.net/v1/resources",
  "https://subnet.example.om",
  "http://cdn.example.aero",
  "http://example.tel",
  "https://example.tel",
  "http://example.qa/resource",
  "https://example.xyz/path/to/file",
  "http://123.123.123.123:9999",
  "https://example.com/path/with/many_segments",
  "https://store.example.dev",
  "http://example.dev/path/to/somewhere",
  "https://example.com:1234/complex/path?query=value&another=thing",
  "http://example.com:9090/resource",
  "http://test.example.net/resource/1",
  "https://www.example.com/resource/1?query=example",
  "https://blog.example.com/path/to/article",
  "http://example.com/resource_with_underscores",
  "http://longdomainname.example.info",
  "https://123.123.123.123",
  "http://www.example.net/resource/endpoint",
  "https://example.tv",
  "http://media.example.net",
  "https://example.work",
  "http://example.one",
  "https://cloud.example.ai",
  "https://example.company",
  "https://example.store",
  "http://shop.example.us",
  "https://sub.example.uk",
  "http://api.example.biz",
  "https://cdn.example.cloud",
  "https://support.example.com",
  "http://test.example.om/path",
  "https://mail.example.co",
  "https://www.example.travel/resource?query=string",
  "http://web.example.dev/file",
  "https://store.example.shop",
  "http://media.example.agency",
  "https://sub.example.team",
  "http://example.guide",
  "http://example.com/with/slashes",
  "http://example.com/with/slashes/",
  "http://example.com?query=string",
  "http://example.com/path/file.jpg",
  "http://www.example.org/file.zip",
  "https://sub.example.com/resource.php",
  "https://example.com?param1=value1&param2=value2",
  // tbd later
  // "http://example.blog",
  // "http://localhost:8000/path/to/resource",
  // "https://localhost:9000/path",
  // "https://example:9000/resource?param=value",
  // "http://localhost:8080",
  // "http://[2001:db8::ff00:42:8329]",
  // "https://localhost:3000",
  // "http://localhost",
];

const filenames = [
  "analysis.py",
  "analysis.r",
  "app.js",
  "archive.tar.gz",
  "archive.tar",
  "archive.zip",
  "avatar.png",
  "backup.rar",
  "book.pdf",
  "bootstrap.css",
  "calendar.ics",
  "chapter.odt",
  "chart.xls",
  "code.cpp",
  "code.java",
  "code.kt",
  "code.py",
  "code.rs",
  "code.scala",
  "codebase.ts",
  "codefile.cpp",
  "config.xml",
  "config.yaml",
  "configuration.yaml",
  "contract.docx",
  "data.cpp",
  "data.csv",
  "data.json",
  "data.sql",
  "data.yml",
  "database.sql",
  "database.yml",
  "dataset.csv",
  "design.ai",
  "design.psd",
  "diagram.xml",
  "diary.txt",
  "dockerfile.yml",
  "document.odt",
  "example.gif",
  "experiment.py",
  "file.asm",
  "file.doc",
  "function.cs",
  "function.kt",
  "guide.docx",
  "guide.pdf",
  "home.html",
  "homepage.html",
  "image.bmp",
  "image.gif",
  "image.jpg",
  "index.html",
  "index.php",
  "invoice.pdf",
  "lambda.js",
  "lambda.py",
  "layout.css",
  "log.txt",
  "logfile.log",
  "logo.svg",
  "manual.doc",
  "markdown.md",
  "maths.xls",
  "module.swift",
  "notes.txt",
  "notes.yaml",
  "package.json",
  "package.xml",
  "photo.jpeg",
  "photo.tiff",
  "picture.jpeg",
  "presentation.key",
  "presentation.odp",
  "presentation.pdf",
  "presentation.ppt",
  "presentation.pptx",
  "process.sh",
  "program.c",
  "program.py",
  "program.vbs",
  "project.asm",
  "project.swift",
  "python.py",
  "readme.md",
  "report.md",
  "report.odp",
  "report.pdf",
  "research.odt",
  "results.txt",
  "resume.doc",
  "screenshot.png",
  "script.js",
  "script.pl",
  "server.go",
  "setup.exe",
  "shell.sh",
  "solution.java",
  "spreadsheet.ods",
  "spreadsheet.xlsx",
  "style.css",
  "style.less",
  "style.scss",
  "stylesheet.css",
  "task.go",
  "test.asm",
  "test.sh",
  "test.swift",
  "testcase.rb",
  "textfile.txt",
  "thesis.pdf",
  "thesis.tex",
  "tutorial.py",
  "url_to_image_5.jpg",
  "url-to-image-5.jpg",
  "url%to%image%5.jpg",
  "video.mp4",
  "webapp.ts",
  "webapp.zip",
  "website.html",
  "website.php",
  "windows.bat",
];


function countMatches(text, string) {
  const regex = new RegExp(string, 'g');  
  const matches = text.match(regex);   
  return matches ? matches.length : 0;       
}


function testExcludeExceptions(testCase, label) {
  // Add uppercase to testCase items
  testCase = testCase.concat(testCase.map(item => item.toUpperCase()));
    
  // Expand testCase with duplicate items 
  const testItemsArray = [...testCase];
  testItemsArray.splice(Math.floor(testItemsArray.length/2), 0, testCase[0]);
  testItemsArray.push(testCase[0]);

  // Expand testCase with items that shouldn’t be replaced
  const testString = "just the string";
  testItemsArray.unshift(testString);
  testItemsArray.splice(Math.floor(testItemsArray.length/2), 0, testString);
  testItemsArray.push(testString);

  const testItemsString = testItemsArray.join(' ');
 
  const { processedText } = excludeExceptions(testItemsString, locale);
  
  it(`shouldn’t exclude test string “${testString}”`, () => {
    assert.strictEqual(countMatches(processedText, testString), 3);

  });

  testCase.forEach((item) => {
    it(`should exclude all ${label}s `, () => {
      assert.strictEqual(processedText.includes(item), false, `${item} should be excluded from the processed text.`);
    });
  });
}



describe("Exclude Exceptions: Emails", () => {
  testExcludeExceptions(emails, 'email');
});

describe("Exclude Exceptions: URLs", () => {
  testExcludeExceptions(urls, 'URL');
});

describe("Exclude Exceptions: filenames", () => {
  testExcludeExceptions(filenames, 'filename');
});

describe("Exclude Exceptions: Emails+URLs+filenames", () => {
  const allExceptions = emails.concat(urls, filenames);
  testExcludeExceptions(allExceptions, 'Emails+URLs+filenames');
});

