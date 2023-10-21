package main

import "gopkg.in/yaml.v3"

type Task struct {
    Name    string `yaml:"name"`
    Command string `yaml:"command"`
}

type Playbook struct {
    Name  string `yaml:"name"`
    Tasks []Task `yaml:"tasks"`
}

func ParsePlaybook(yamlStr string) (*Playbook, error) {
    var playbook Playbook
    err := yaml.Unmarshal([]byte(yamlStr), &playbook)
    if err != nil {
        return nil, err
    }
    return &playbook, nil
}
