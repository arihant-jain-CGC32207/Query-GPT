from services.query_service import QueryService

def main():
    db_name = "cgcl_los_uat"
    collection_name = "leads"
    query_service = QueryService(db_name)

    user_query = "Get a count of leads based on their status. Only consider leads that have a valid status."
    df = query_service.query_gpt(user_query, collection_name, is_top_level=True)
    print(df)

if __name__ == "__main__":
    main()
