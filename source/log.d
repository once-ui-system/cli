import std.stdio : writefln;

pragma(inline, true)
void error(string msg) {
  writefln("\033[1m\033[91mx\033[0m %s", msg);
}

pragma(inline, true)
void warn(string msg) {
  writefln("\033[1m\033[93m⚠\033[0m %s", msg);
}

pragma(inline, true)
void ok(string msg) {
  writefln("\033[1m\033[92m✔\033[0m %s", msg);
}

pragma(inline, true)
void done(string msg) {
  writefln("\033[1m\033[32m✔\033[0m %s", msg);
}

pragma(inline, true)
void info(string msg) {
  writefln("\033[1m\033[94m→\033[0m %s", msg);
}

pragma(inline, true)
void verbose(string msg) {
  writefln("\033[1m|\033[0m %s", msg);
}

