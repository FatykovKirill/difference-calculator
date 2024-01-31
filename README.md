### Tests:
[![Actions Status](https://github.com/FatykovKirill/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/FatykovKirill/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/891bd4b94f7f9e9cb418/maintainability)](https://codeclimate.com/github/FatykovKirill/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/891bd4b94f7f9e9cb418/test_coverage)](https://codeclimate.com/github/FatykovKirill/frontend-project-46/test_coverage)
[![setup-and-test](https://github.com/FatykovKirill/frontend-project-46/actions/workflows/setup-and-test.yml/badge.svg)](https://github.com/FatykovKirill/frontend-project-46/actions/workflows/setup-and-test.yml/badge.svg)
# Description
Difference Calculator is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example http://www.jsondiff.com /. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.
* Support for different input formats: __yaml__, __json__
* Generating a report in the form of __plain__ text, __stylish__ and __json__
# Installation
1. Clone the repository
```
$ git clone https://github.com/FatykovKirill/frontend-project-46.git
```
2. Install the program
```
$ cd frontend-project-46
$ make install
```
# Formatters
The program is able to display differences in three formats, by default this is the __stylish__ format. It can also be __plain__ and __json__. To output the result according to a specific format, enter -f [format]
### Example:
```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  outoutput format (default: "stylish")
  -h, --help           display help for command
```
### Format stylish
```
$ gendiff  filepath1.json filepath2.json
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
### Format plain
```
$ gendiff -f plain filepath1.json filepath2.json
  Property 'common.follow' was added with value: false
  Property 'group1.baz' was updated. From 'bas' to 'bars'
  Property 'group2' was removed
```
```
$ gendiff -f json filepath1.json filepath2.json
  Property 'common.follow' was added with value: false
  Property 'group1.baz' was updated. From 'bas' to 'bars'
  Pro
```
### Format json
```
[
  {
    "key": "group3",
    "type": "added",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    }
  }
]
```

# Launch Example
### Flat Files:
### Сalculating the differences between JSON files. 
[![asciicast](https://asciinema.org/a/6okHFs9W3TMSiaKMuVkqqna4K.svg)](https://asciinema.org/a/6okHFs9W3TMSiaKMuVkqqna4K)
### Сalculating the differences between YAML files.
[![asciicast](https://asciinema.org/a/6K3liCZ55UFW7FjmI9df72wna.svg)](https://asciinema.org/a/6K3liCZ55UFW7FjmI9df72wna)
### Nested Files 
### Differences in stylish format
[![asciicast](https://asciinema.org/a/EKuLpIxDTWbBLQTu6KqVbQvTy.svg)](https://asciinema.org/a/EKuLpIxDTWbBLQTu6KqVbQvTy)
### Differences in plain format
[![asciicast](https://asciinema.org/a/OGdK6d7whcfJNmlRNv7jptiWK.svg)](https://asciinema.org/a/OGdK6d7whcfJNmlRNv7jptiWK)
### Differences in JSON format