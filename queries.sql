WITH sizeChartCategoryAndSubCategory AS (
  SELECT schc."sizeChartId", string_agg(DISTINCT c."name", ', ') AS Categories, string_agg(DISTINCT subc."name", ', ') AS subCategories FROM "SizeChartCategory" schc
  LEFT JOIN "Category" c ON c.id = schc."categoryId"
  LEFT JOIN "SubCategory" subc ON subc.id = schc."subCategoryId"
  group by schc."sizeChartId"
)

SELECT 
b.id, 
b.name, 
sch.id AS sizeChartId, 
sch."canonicalCategories" AS canonicalCategories, 
schcat.categories, 
schcat.subCategories, 
si."sizeSystem" as sizeSystem, 
si.size, si."sizePosition"
FROM "Brand" b 
INNER JOIN "SizeChart" sch ON sch."brandId" = b.id
INNER JOIN "Size" si ON si."sizeChartId" = sch.id
LEFT JOIN sizeChartCategoryAndSubCategory schcat ON schcat."sizeChartId" = sch.id
WHERE b.id = 'jordan'