import log;
import std.process : spawnShell, wait;

void parse_url(ref string unparsed) {
  import std.array : replace;
  import std.algorithm : startsWith;

  // since basically everything is on GH, @ gets replaced with github
  unparsed = unparsed.replace("@", "https://github.com/");

  if (!unparsed.startsWith("https://")) {
    unparsed = "https://" ~ unparsed;
  }
}

bool command_in_path(string command) {
  import std.process : environment;
  import std.array : split;
  import std.file : exists;

  const auto path = environment.get("PATH", "");

  string[] parts;
  version (Windows) {
    parts = path.split(";");   
  } else {
    parts = path.split(":");
  }

  foreach (dir ; parts) {
    string[] look_for;
    const auto base = dir ~ "/" ~ command;

    version (Windows) {
      look_for ~= base ~ ".exe";
      look_for ~= base ~ ".bat";
      look_for ~= base ~ ".cmd";
    } else {
      look_for ~= base;
    }
    
    foreach (file ; look_for) {
      if (exists(dir ~ "/" ~ command)) {
        return true;
      }
    }
  }

  return false;
}

/* Returns 2 if Git is not installed. */
int clone_git_repo(string repo, string dir = ".") {
  log.info("Cloning \033[1m" ~ repo ~ "\033[0m");

  if (!command_in_path("git")) {
    log.error(
      "Git is not installed. Install it for your platform at \033[1mhttps://git-scm.com/install/\033[0m."
    );
    return 2;
  }

  // Command injection is not possible here since all args are taken
  // from argv, so if anything is injected the parent shell runs it,
  // not this shell. Think before saying there is a vulnerability.
  const auto command = "git clone --depth=1 " ~ repo ~ " " ~ dir;

  auto pid = spawnShell(command);
  const auto status = wait(pid);

  return status;
}

int npm_install() {
  log.info("Installing dependencies");

  if (!command_in_path("npm")) {
    log.error(
      "NPM is not installed. Install it for your platform at \033[1mhttps://nodejs.org/en/download/\033[0m."
    );
    return 2;
  }

  auto pid = spawnShell("npm install --loglevel info");
  const auto status = wait(pid);

  return status;
}

bool create_project_from_template(string name, string dir) {
  import std.file : exists, chdir;
  
  bool skip_clone = false;

  if (dir != "." && exists(dir)) {    
    import std.stdio : write, readln;

    log.error("Directory" ~ dir ~ " already exists.");
    write("  Do you want to skip cloning? [y/N] ");
    auto confirm = readln();

    if (confirm[0] == 'y' || confirm[0] == 'Y')
      skip_clone = true;
  }
  
  auto url = name;
  parse_url(url);

  if (!skip_clone) {
    int git_result = clone_git_repo(url, dir);
    if (git_result != 0)
      return false;
  } else {
    log.warn("Skipping git clone!");
  }

  chdir(dir);
  if (npm_install() != 0) {
    log.error("Failed to install dependencies!");
    return false;
  }
  log.ok("Installed dependencies!\n");

  log.ok("Created project from \033[1m" ~ name ~ "\033[0m");
  log.info("Start the dev server:");
  log.verbose("cd " ~ dir);
  log.verbose("npm run dev");
  log.info("Have fun!");

  return true;
}
