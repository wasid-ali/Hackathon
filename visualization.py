import pandas as pd
import matplotlib.pyplot as plt
from google.cloud import storage
import io
import json
import base64

def generate_visualizations(request, headers):

    try:
        # Hardcoded bucket and filename
        bucket_name = 'consumerdataset'
        filename = 'consumer_electronics_sales_data.csv'

        # Download the CSV file from Cloud Storage
        storage_client = storage.Client()
        bucket = storage_client.bucket(bucket_name)
        blob = bucket.blob(filename)
        csv_content = blob.download_as_string()

        # Read the CSV into a pandas DataFrame
        df = pd.read_csv(io.StringIO(csv_content.decode('utf-8')))

        # Generate visualizations
        visualizations = {}

        # 1. Product Analysis
        visualizations['product_category_sales'] = encode_base64(product_category_sales(df))
        visualizations['revenue_distribution'] = encode_base64(revenue_distribution(df))
        visualizations['price_vs_sales'] = encode_base64(price_vs_sales(df))

        # 2. Customer Demographics
        visualizations['customer_age_distribution'] = encode_base64(customer_age_distribution(df))
        visualizations['gender_distribution'] = encode_base64(gender_distribution(df))
        visualizations['age_groups_by_gender'] = encode_base64(age_groups_by_gender(df))

        # 3. Customer Behavior
        visualizations['purchase_frequency_vs_age'] = encode_base64(purchase_frequency_vs_age(df))
        visualizations['satisfaction_by_category'] = encode_base64(satisfaction_by_category(df))
        visualizations['satisfaction_vs_frequency'] = encode_base64(satisfaction_vs_frequency(df))

        # 4. Purchase Intent Analysis
        visualizations['intent_by_category'] = encode_base64(intent_by_category(df))
        visualizations['age_vs_intent'] = encode_base64(age_vs_intent(df))
        visualizations['intent_by_gender_category'] = encode_base64(intent_by_gender_category(df))

        # 5. Brand Analysis
        visualizations['top_selling_brands'] = encode_base64(top_selling_brands(df))
        visualizations['brand_performance_by_category'] = encode_base64(brand_performance_by_category(df))
        visualizations['brand_price_sales'] = encode_base64(brand_price_sales(df))

        # 6. Price Analysis
        visualizations['price_distribution'] = encode_base64(price_distribution(df))
        visualizations['price_ranges_by_category'] = encode_base64(price_ranges_by_category(df))
        visualizations['price_vs_satisfaction'] = encode_base64(price_vs_satisfaction(df))

        # 7. Customer Satisfaction
        visualizations['satisfaction_heatmap'] = encode_base64(satisfaction_heatmap(df))
        visualizations['correlation_matrix'] = encode_base64(correlation_matrix(df))
        visualizations['pair_plot'] = encode_base64(pair_plot(df))

        # Return visualizations as base64 strings in JSON format
        return json.dumps({
            "status": "success",
            "visualizations": visualizations
        }), 200, headers

    except Exception as e:
        # Error handling
        return json.dumps({
            "status": "error",
            "message": str(e)
        }), 500, headers

# Function to encode matplotlib visualizations as base64
def encode_base64(image_png):
    return base64.b64encode(image_png).decode('utf-8')

def product_category_sales(df):
    plt.figure(figsize=(10, 6))
    df['ProductCategory'].value_counts().plot(kind='bar')
    plt.title('Product Categories by Sales Volume')
    plt.xlabel('Product Category')
    plt.ylabel('Sales Volume')
    return save_plot_to_png()

def revenue_distribution(df):
    plt.figure(figsize=(10, 6))
    df.groupby('ProductCategory')['ProductPrice'].sum().plot(kind='pie', autopct='%1.1f%%')
    plt.title('Revenue Distribution Across Product Categories')
    return save_plot_to_png()

def price_vs_sales(df):
    plt.figure(figsize=(10, 6))
    plt.scatter(df['ProductPrice'], df['PurchaseFrequency'])
    plt.title('Product Price vs. Sales Volume')
    plt.xlabel('Price')
    plt.ylabel('Purchase Frequency')
    return save_plot_to_png()

def customer_age_distribution(df):
    plt.figure(figsize=(10, 6))
    df['CustomerAge'].hist(bins=20)
    plt.title('Customer Age Distribution')
    plt.xlabel('Age')
    plt.ylabel('Count')
    return save_plot_to_png()

def gender_distribution(df):
    plt.figure(figsize=(10, 6))
    df['CustomerGender'].value_counts().plot(kind='bar')
    plt.title('Gender Distribution of Customers')
    plt.xlabel('Gender')
    plt.ylabel('Count')
    plt.xticks([0, 1], ['Male', 'Female'])
    return save_plot_to_png()

def age_groups_by_gender(df):
    plt.figure(figsize=(10, 6))
    df['AgeGroup'] = pd.cut(df['CustomerAge'], bins=[0, 20, 40, 60, 80, 100])
    age_gender = df.groupby(['AgeGroup', 'CustomerGender']).size().unstack()
    age_gender.plot(kind='bar', stacked=True)
    plt.title('Age Groups by Gender')
    plt.xlabel('Age Group')
    plt.ylabel('Count')
    plt.legend(['Male', 'Female'])
    return save_plot_to_png()

def purchase_frequency_vs_age(df):
    plt.figure(figsize=(10, 6))
    plt.scatter(df['CustomerAge'], df['PurchaseFrequency'])
    plt.title('Purchase Frequency vs. Customer Age')
    plt.xlabel('Age')
    plt.ylabel('Purchase Frequency')
    return save_plot_to_png()

def satisfaction_by_category(df):
    plt.figure(figsize=(10, 6))
    df.boxplot(column='CustomerSatisfaction', by='ProductCategory')
    plt.title('Customer Satisfaction Across Product Categories')
    plt.suptitle('')
    plt.ylabel('Satisfaction Rating')
    return save_plot_to_png()

def satisfaction_vs_frequency(df):
    plt.figure(figsize=(10, 6))
    plt.hist2d(df['CustomerSatisfaction'], df['PurchaseFrequency'], bins=20)
    plt.colorbar()
    plt.title('Customer Satisfaction vs. Purchase Frequency')
    plt.xlabel('Satisfaction Rating')
    plt.ylabel('Purchase Frequency')
    return save_plot_to_png()

def intent_by_category(df):
    plt.figure(figsize=(10, 6))
    df.groupby('ProductCategory')['PurchaseIntent'].mean().plot(kind='bar')
    plt.title('Purchase Intent by Product Category')
    plt.xlabel('Product Category')
    plt.ylabel('Average Purchase Intent')
    return save_plot_to_png()

def age_vs_intent(df):
    plt.figure(figsize=(10, 6))
    plt.scatter(df['CustomerAge'], df['PurchaseIntent'])
    plt.title('Customer Age vs. Purchase Intent')
    plt.xlabel('Age')
    plt.ylabel('Purchase Intent')
    return save_plot_to_png()

def intent_by_gender_category(df):
    plt.figure(figsize=(12, 6))
    df.groupby(['ProductCategory', 'CustomerGender'])['PurchaseIntent'].mean().unstack().plot(kind='bar')
    plt.title('Purchase Intent by Gender for Each Product Category')
    plt.xlabel('Product Category')
    plt.ylabel('Average Purchase Intent')
    plt.legend(['Male', 'Female'])
    return save_plot_to_png()

def top_selling_brands(df):
    plt.figure(figsize=(10, 6))
    df['ProductBrand'].value_counts().head(10).plot(kind='bar')
    plt.title('Top 10 Selling Brands')
    plt.xlabel('Brand')
    plt.ylabel('Sales Count')
    return save_plot_to_png()

def brand_performance_by_category(df):
    plt.figure(figsize=(12, 6))
    df.groupby(['ProductCategory', 'ProductBrand']).size().unstack().plot(kind='bar', stacked=True)
    plt.title('Brand Performance Across Product Categories')
    plt.xlabel('Product Category')
    plt.ylabel('Sales Count')
    plt.legend(title='Brand', bbox_to_anchor=(1.05, 1), loc='upper left')
    plt.tight_layout()
    return save_plot_to_png()

def brand_price_sales(df):
    plt.figure(figsize=(10, 6))
    brands = df.groupby('ProductBrand').agg({
        'ProductPrice': 'mean',
        'PurchaseFrequency': 'sum'
    })
    plt.scatter(brands['ProductPrice'], brands['PurchaseFrequency'], 
                s=brands['PurchaseFrequency']/10, alpha=0.5)
    for i, brand in enumerate(brands.index):
        plt.annotate(brand, (brands['ProductPrice'][i], brands['PurchaseFrequency'][i]))
    plt.title('Brand, Average Price, and Sales Volume')
    plt.xlabel('Average Price')
    plt.ylabel('Total Sales')
    return save_plot_to_png()

def price_distribution(df):
    plt.figure(figsize=(10, 6))
    df['ProductPrice'].hist(bins=50)
    plt.title('Price Distribution of Products')
    plt.xlabel('Price')
    plt.ylabel('Count')
    return save_plot_to_png()

def price_ranges_by_category(df):
    plt.figure(figsize=(10, 6))
    df.boxplot(column='ProductPrice', by='ProductCategory')
    plt.title('Price Ranges for Each Product Category')
    plt.suptitle('')
    plt.ylabel('Price')
    plt.xticks(rotation=45)
    return save_plot_to_png()

def price_vs_satisfaction(df):
    plt.figure(figsize=(10, 6))
    plt.scatter(df['ProductPrice'], df['CustomerSatisfaction'])
    plt.title('Product Price vs. Customer Satisfaction')
    plt.xlabel('Price')
    plt.ylabel('Satisfaction Rating')
    return save_plot_to_png()

def satisfaction_heatmap(df):
    plt.figure(figsize=(12, 8))
    pivot = df.pivot_table(values='CustomerSatisfaction', index='ProductBrand', columns='ProductCategory', aggfunc='mean')
    plt.imshow(pivot, cmap='YlOrRd')
    plt.colorbar()
    plt.title('Satisfaction Levels Across Brands and Product Categories')
    plt.xlabel('Product Category')
    plt.ylabel('Brand')
    plt.xticks(range(len(pivot.columns)), pivot.columns, rotation=45)
    plt.yticks(range(len(pivot.index)), pivot.index)
    return save_plot_to_png()

def correlation_matrix(df):
    plt.figure(figsize=(10, 8))
    corr = df[['ProductPrice', 'CustomerAge', 'PurchaseFrequency', 'CustomerSatisfaction', 'PurchaseIntent']].corr()
    plt.imshow(corr, cmap='coolwarm')
    plt.colorbar()
    plt.xticks(range(len(corr.columns)), corr.columns, rotation=45)
    plt.yticks(range(len(corr.index)), corr.index)
    plt.title('Correlation Matrix of Key Metrics')
    return save_plot_to_png()

def pair_plot(df):
    import seaborn as sns
    sns.pairplot(df[['ProductPrice', 'CustomerAge', 'PurchaseFrequency', 'CustomerSatisfaction', 'PurchaseIntent']])
    return save_plot_to_png()

def save_plot_to_png():
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    plt.close()
    return image_png