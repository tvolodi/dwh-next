export enum PageMode {
    ADD = "add",
    EDIT = "edit",
    DELETE = "delete",
    VIEW = "view",
}

export enum EtlProcessConfigStatus {
    ENABLED = "enabled",
    DISABLED = "disabled",
}

export enum EtlProcessStatus {
    SCHEDULED = "scheduled",
    RUNNING = "running",
    COMPLETED = "completed",
    FAILED = "failed",    
}

export enum TransformationDescriptionTypes {
    JS = "js",
    PSEUDO_JS = "pseudo_js",
    SQL = "sql",
    PYTHON = "python",
    SHELL = "shell",
    JSON = "json",
    XML = "xml",
    
}