# Add tags for schemas
import json
import sys


def getOAS():
    # Check that the args are valid and then open and load the file contents.
    args = sys.argv
    if len(args) != 2:
        print("usage: python3 formatOAS.py file.json")
        sys.exit(1)
    elif ".json" not in args[1]:
        print("input must be a json file")
        print("usage: python3 formatOAS.py file.json")
        sys.exit(1)
    else:
        with open(args[1]) as f:
            return json.load(f)


def addModelTags(oas):
    if "tags" not in oas:
        oas["tags"] = []

    if "x-tagGroups" not in oas:
        oas["x-tagGroups"] = []

    # Here we just add the model tags
    models = {"name": "Models", "tags": []}
    for schema in oas["definitions"]:
        models["tags"].append(schema)
        # For some reason "components/schemas" references the definitions
        oas["tags"].append({
            "name": schema,
            "x-display": schema,
            "description": "<SchemaDefinition schemaRef=\"#/components/schemas/%s\" />" % schema
        })

    # Here we create the tag group called "Models"
    oas["x-tagGroups"].append(models)
    return oas


def addPathTags(oas):
    # Add all of the path tags to the API endpoint tag group

    if "x-tagGroups" not in oas:
        oas["x-tagGroups"] = []

    # Cycle through all of the paths, for each operation
    # Take the tag given to the path/operation and add it to
    # the API Endpoints tag group if it's not already there
    group = {"name": "API Endpoints", "tags": []}
    for path in oas["paths"]:
        for op in oas["paths"][path]:
            if "tags" in list(oas["paths"][path][op].keys()):
                tag = oas["paths"][path][op]["tags"]
            else:
                print("Not tagging: %s" % path)
            if tag not in group["tags"]:
                group["tags"].append(tag)

    # Ensure that API endpoints appears before models
    groups = []
    groups.append(group)
    groups.extend(oas["x-tagGroups"])
    oas["x-tagGroups"] = groups
    return oas


def main():
    oas = getOAS()
    # Convert #/compoments/schemas to #/definitions
    definitions = oas["components"]["schemas"]
    oas["definitions"] = definitions
    del oas["components"]
    finalized = addPathTags(addModelTags(oas))
    # dump the changes to oas.json
    f = open("oas.json", "w+")
    json.dump(finalized, f)
    f.close()


if __name__ == "__main__":
    main()
