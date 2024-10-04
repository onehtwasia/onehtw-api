# Tables

### <a name="book"></a>book

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |

### <a name="book_local"></a>book_local

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| book_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False | [book.id](#book) |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False | [language.id](#language) |
| name | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |

### <a name="partner"></a>partner

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.1/datatype-uuid.html">uuid</a> |  | False |  |
| name | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| name_eng | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| name_local | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| website | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| country | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |

### <a name="label"></a>label

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| title | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| description | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| default_value | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |

### <a name="label_local"></a>label_local

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| label_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [label.id](#label) |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| name | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |

### <a name="language"></a>language

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| name | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| name_eng | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| version | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| googleid | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| priority | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">integer</a> |  | True |  |
| enabled | <a href="https://www.postgresql.org/docs/9.5/datatype-boolean.html">boolean</a> |  | True |  |

### <a name="news"></a>news

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.1/datatype-uuid.html">uuid</a> | uuid_generate_v4() | False |  |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| title | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| message | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| youtube | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| actionlabel | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| actionlink | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| created | <a href="https://www.postgresql.org/docs/9.5/datatype-datetime.html">timestamp with time zone</a> |  | True |  |

### <a name="devotional"></a>devotional

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| campaign_id | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">integer</a> |  | True | [campaign.id](#campaign) |
| date | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| bible_quote | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| title | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| version | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">numeric</a> |  | True |  |
| closing_prayer_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| closing_prayer_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| devotional_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| devotional_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| opening_prayer_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| opening_prayer_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| special_prayer_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| special_prayer_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| testimony_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| testimony_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| testimony_video | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| videos | ARRAY |  | True |  |
| big_videos | ARRAY |  | True |  |
| gospel_film_video | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| gospel_film_videos | ARRAY |  | True |  |
| prayer_text | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| prayer_audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |

### <a name="devotional_reading"></a>devotional_reading

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">integer</a> |  | False |  |
| devotional_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [devotional.id](#devotional) |
| passage | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| audio | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| start | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">numeric</a> |  | True |  |
| end | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">numeric</a> |  | True |  |
| chapterverse | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| book_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |

### <a name="testimony"></a>testimony

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.1/datatype-uuid.html">uuid</a> | uuid_generate_v4() | False |  |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| title | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| message | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| youtube | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| actionlabel | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| actionlink | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| created | <a href="https://www.postgresql.org/docs/9.5/datatype-datetime.html">timestamp with time zone</a> |  | True |  |

### <a name="user"></a>user

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| created_at | <a href="https://www.postgresql.org/docs/9.5/datatype-datetime.html">timestamp with time zone</a> |  | True |  |
| updated_at | <a href="https://www.postgresql.org/docs/9.5/datatype-datetime.html">timestamp with time zone</a> |  | True |  |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| userid | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| version | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| church_id | <a href="https://www.postgresql.org/docs/9.1/datatype-uuid.html">uuid</a> |  | True | [church.id](#church) |

### <a name="church"></a>church

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.1/datatype-uuid.html">uuid</a> |  | False |  |
| name_eng | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| name_local | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| location | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| country | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |

### <a name="campaign_local"></a>campaign_local

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| campaign_id | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">integer</a> |  | True | [campaign.id](#campaign) |
| language_id | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True | [language.id](#language) |
| name | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |

### <a name="campaign"></a>campaign

| Name | Type | Default | Nullable | References |
| -- | -- | -- | -- | ---------- |
| id <span style="background: #ddd; padding: 2px; font-size: 0.75rem; color: black">PK</span> | <a href="https://www.postgresql.org/docs/9.5/datatype-numeric.html">integer</a> |  | False |  |
| name_eng | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | False |  |
| start_date | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
| end_date | <a href="https://www.postgresql.org/docs/9.5/datatype-character.html">text</a> |  | True |  |
