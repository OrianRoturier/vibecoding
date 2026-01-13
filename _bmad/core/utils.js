// Core utility functions for BMAD method

/**
 * Initialize a new BMAD workflow
 * @param {string} projectName - Name of the project
 * @param {string} track - Planning track (Quick Flow, BMad Method, Enterprise)
 * @returns {Object} Workflow status object
 */
exports.initWorkflow = function(projectName, track) {
  return {
    projectName: projectName,
    track: track,
    phase: "Analysis",
    status: "initialized",
    createdAt: new Date().toISOString(),
    documents: []
  };
};

/**
 * Create a workflow status file
 * @param {Object} workflowStatus - Workflow status object
 * @param {string} filePath - Path to save the workflow status
 */
exports.saveWorkflowStatus = function(workflowStatus, filePath) {
  const fs = require('fs');
  const yaml = require('js-yaml');
  const statusYaml = yaml.dump(workflowStatus);
  fs.writeFileSync(filePath, statusYaml);
};

/**
 * Load workflow status from file
 * @param {string} filePath - Path to workflow status file
 * @returns {Object} Workflow status object
 */
exports.loadWorkflowStatus = function(filePath) {
  const fs = require('fs');
  const yaml = require('js-yaml');
  const statusYaml = fs.readFileSync(filePath, 'utf8');
  return yaml.load(statusYaml);
};

/**
 * Update workflow phase
 * @param {Object} workflowStatus - Current workflow status
 * @param {string} newPhase - New phase to transition to
 * @returns {Object} Updated workflow status
 */
exports.updateWorkflowPhase = function(workflowStatus, newPhase) {
  workflowStatus.phase = newPhase;
  workflowStatus.lastUpdated = new Date().toISOString();
  return workflowStatus;
};

/**
 * Add document to workflow
 * @param {Object} workflowStatus - Current workflow status
 * @param {string} documentName - Name of document to add
 * @returns {Object} Updated workflow status
 */
exports.addDocument = function(workflowStatus, documentName) {
  if (!workflowStatus.documents.includes(documentName)) {
    workflowStatus.documents.push(documentName);
  }
  return workflowStatus;
};