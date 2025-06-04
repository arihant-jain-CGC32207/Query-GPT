def generate_schema_top_level(db, collection_name, sample_size=50, batch_size=3):
    field_set = set()
    collection = db.database[collection_name]
    cursor = collection.find({}).limit(sample_size).batch_size(batch_size)

    batch = []
    try:
        while True:
            doc = next(cursor)
            batch.append(doc)
            if len(batch) == batch_size:
                for sample in batch:
                    field_set.update(sample.keys())
                batch.clear()
    except StopIteration:
        if batch:
            for sample in batch:
                field_set.update(sample.keys())

    fields = list(field_set)
    if "_id" in fields:
        fields.remove("_id")
    return fields

def get_all_keys_nested(doc):
    result = {}
    for key, value in doc.items():
        if isinstance(value, dict):
            result[key] = get_all_keys_nested(value)
        elif isinstance(value, list):
            result[key] = [
                get_all_keys_nested(item) if isinstance(item, dict) else {}
                for item in value
            ]
        else:
            result[key] = {}
    return result

def generate_schema_nested_level(db, collection_name, sample_size=50, batch_size=3):
    collection = db.database[collection_name]
    schema_dict = {}
    cursor = collection.find({}).limit(sample_size).batch_size(batch_size)

    batch = []
    try:
        while True:
            doc = next(cursor)
            batch.append(doc)
            if len(batch) == batch_size:
                for sample in batch:
                    nested_keys = get_all_keys_nested(sample)
                    schema_dict.update(nested_keys)
                batch.clear()
    except StopIteration:
        if batch:
            for sample in batch:
                nested_keys = get_all_keys_nested(sample)
                schema_dict.update(nested_keys)

    return schema_dict
