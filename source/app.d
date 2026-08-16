import log;
import create;

int main(string[] argv) {
  const auto argc = argv.length;

  if (argc == 1) {
    log.error("You must provide more arguments!");
    log.info("Maybe you meant: once-ui create .");
    log.info("For an overview of all commands, run: once-ui --help");
    return 2;
  }

  if (argv[1] == "--help") {
    
    log.info("once-ui: Once UI CLI app");
    log.info("Arguments:");
    log.verbose(" create     create a simple template app");
    log.verbose(" create -t  create an app from a template");
    log.verbose(" docs       open docs for something\n");

    log.info("Authors:");
    log.verbose(" mostypc123 <mostypc123@redroselinux.org>");

    return 0;

  } else if (argv[1] == "create") {
    
    bool from_template = false;
    string dir;
    string template_git_repo_url;

    if (argc == 2) {
      log.error("You must specify a directory to create the template in.");
      return 2;
    }

    if (argv[2] == "-t") {
      
      from_template = true;

      if (argc <= 4) {
        log.error("You must specify a template Git URL to use, and a directory to create it in.");
        return 2;
      }

      dir = argv[4];
      template_git_repo_url = argv[3];

    } else {
    
      dir = argv[2];

    }

  }

  return 0;
}
