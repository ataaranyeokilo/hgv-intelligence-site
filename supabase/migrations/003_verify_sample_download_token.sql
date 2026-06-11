create or replace function verify_sample_download_token(p_token text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_updated integer;
begin
  if p_token is null or length(trim(p_token)) = 0 then
    return false;
  end if;

  update leads
  set
    status = 'verified',
    verified_at = coalesce(verified_at, now())
  where download_token = p_token
    and token_expires_at > now();

  get diagnostics v_updated = row_count;
  return v_updated > 0;
end;
$$;

revoke all on function verify_sample_download_token(text) from public;
grant execute on function verify_sample_download_token(text) to anon;
