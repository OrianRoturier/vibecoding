#!/usr/bin/env node

// BMAD Method CLI Implementation
const { initWorkflow, saveWorkflowStatus, loadWorkflowStatus, updateWorkflowPhase, addDocument } = require('./_bmad/core/utils');
const yaml = require('js-yaml');
const fs = require('fs');

// Main CLI function
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'init':
      initProject();
      break;
    case 'status':
      showStatus();
      break;
    case 'phase':
        if (args.length < 2) {
          console.log('Usage: bmad phase <new-phase>');
          return;
        }
        updatePhase(args[1]);
        break;
    case 'add-doc':
        if (args.length < 2) {
          console.log('Usage: bmad add-doc <document-name>');
          return;
        }
        addDocumentToWorkflow(args[1]);
        break;
    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
  }
}

function showHelp() {
  console.log(`
BMAD Method CLI - v1.0.0

Usage:
  bmad <command> [options]

Commands:
  init                    Initialize a new BMAD project
  status                  Show current workflow status
  phase <new-phase>       Update workflow phase
  add-doc <document>      Add document to workflow
  --help, -h              Show this help message

Examples:
  bmad init               Initialize BMAD workflow
  bmad status             Show current status
  bmad phase Planning     Move to Planning phase
  bmad add-doc PRD        Add PRD document to workflow
`);
}

function initProject() {
  console.log('Initializing BMAD project...');
  
  // Get project name from user input or use default
  const projectName = 'My BMAD Project';
  const track = 'BMad Method';
  
  const workflowStatus = initWorkflow(projectName, track);
  saveWorkflowStatus(workflowStatus, '_bmad-output/workflow-status.yaml');
  
  console.log('BMAD project initialized successfully!');
  console.log(`Project: ${projectName}`);
  console.log(`Track: ${track}`);
  console.log(`Phase: ${workflowStatus.phase}`);
  console.log('\nNext steps:');
  console.log('1. Run "bmad status" to see current status');
  console.log('2. Use "bmad phase <new-phase>" to progress through phases');
  console.log('3. Add documents with "bmad add-doc <document-name>"');
}

function showStatus() {
  try {
    const workflowStatus = loadWorkflowStatus('_bmad-output/workflow-status.yaml');
    console.log('Current Workflow Status:');
    console.log('=======================');
    console.log(`Project Name: ${workflowStatus.projectName}`);
    console.log(`Track: ${workflowStatus.track}`);
    console.log(`Current Phase: ${workflowStatus.phase}`);
    console.log(`Status: ${workflowStatus.status}`);
    console.log(`Created: ${workflowStatus.createdAt}`);
    console.log(`Last Updated: ${workflowStatus.lastUpdated || 'N/A'}`);
    console.log(`Documents: ${workflowStatus.documents.length > 0 ? workflowStatus.documents.join(', ') : 'None'}`);
  } catch (error) {
    console.log('Error loading workflow status:');
    console.log(error.message);
    console.log('\nPlease initialize the project first with "bmad init"');
  }
}

function updatePhase(newPhase) {
  try {
    let workflowStatus = loadWorkflowStatus('_bmad-output/workflow-status.yaml');
    workflowStatus = updateWorkflowPhase(workflowStatus, newPhase);
    saveWorkflowStatus(workflowStatus, '_bmad-output/workflow-status.yaml');
    console.log(`Workflow phase updated to: ${newPhase}`);
  } catch (error) {
    console.log('Error updating workflow phase:');
    console.log(error.message);
  }
}

function addDocumentToWorkflow(documentName) {
  try {
    let workflowStatus = loadWorkflowStatus('_bmad-output/workflow-status.yaml');
    workflowStatus = addDocument(workflowStatus, documentName);
    saveWorkflowStatus(workflowStatus, '_bmad-output/workflow-status.yaml');
    console.log(`Document added: ${documentName}`);
  } catch (error) {
    console.log('Error adding document:');
    console.log(error.message);
  }
}

// Run the CLI
main();