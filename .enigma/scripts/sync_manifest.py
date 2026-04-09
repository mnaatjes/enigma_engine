#!/usr/bin/env python3
import os
import yaml
import json
import sys
from datetime import datetime, date

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    raise TypeError ("Type %s not serializable" % type(obj))

def sync_manifest():
    agents_dir = os.path.join(os.getcwd(), '.agents')
    manifest_path = os.path.join(os.getcwd(), 'MANIFEST.json')
    
    if not os.path.exists(agents_dir):
        print(f"Error: .agents directory not found at {agents_dir}")
        sys.exit(1)
        
    manifest_data = {
        "metadata": {
            "description": "Consolidated project manifest from .agents configuration",
            "sync_time": datetime.now().isoformat()
        }
    }
    
    try:
        files_processed = 0
        for filename in sorted(os.listdir(agents_dir)):
            if filename.endswith('.yml') or filename.endswith('.yaml'):
                file_path = os.path.join(agents_dir, filename)
                agent_name = os.path.splitext(filename)[0]
                
                with open(file_path, 'r') as f:
                    try:
                        data = yaml.safe_load(f)
                        manifest_data[agent_name] = data
                        files_processed += 1
                    except yaml.YAMLError as exc:
                        print(f"Error parsing {filename}: {exc}")
        
        with open(manifest_path, 'w') as f:
            json.dump(manifest_data, f, indent=2, default=json_serial)
            
        print(f"Successfully synchronized {files_processed} agent(s) to {manifest_path}")
        
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        sys.exit(1)

if __name__ == "__main__":
    sync_manifest()
