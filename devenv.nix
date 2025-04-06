{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  languages.javascript = {
    package = pkgs.nodejs_22;
    enable = true;
  };
}
