package main

import (
	"errors"

	"gopkg.in/yaml.v3"
)

type Task struct {
	Name    string
	Modules map[string]interface{}
}

type Playbook struct {
	Tasks []Task
}

func ParsePlaybook(yamlStr string) (Playbook, error) {
	var playbook Playbook

	err := yaml.Unmarshal([]byte(yamlStr), &playbook)
	if err != nil {
		return Playbook{}, err
	}

	if len(playbook.Tasks) == 0 {
		return Playbook{}, errors.New("no tasks found in the playbook")
	}

	return playbook, nil
}
